import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';

import { bundle } from '@remotion/bundler';
import { renderMedia } from '@remotion/renderer';

const PORT = Number(process.env.PORT || 8787);
const ALLOWED_ORIGINS = (process.env.RENDER_ALLOWED_ORIGINS || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const entryPoint = path.join(process.cwd(), 'remotion', 'index.ts');
const bundleLocation = path.join(process.cwd(), '.remotion-bundle-server');

let serveUrlPromise = null;
async function getServeUrl() {
  if (!serveUrlPromise) {
    serveUrlPromise = bundle({
      entryPoint,
      outDir: bundleLocation,
    });
  }
  return serveUrlPromise;
}

function clampArray(arr, max) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, max);
}

function sanitizePayload(body) {
  // Expected shape matches `remotion/types.ts` (PolicyWrappedRenderProps).
  const displayName = typeof body?.displayName === 'string' ? body.displayName.slice(0, 80) : 'Your Key Issues';
  const label = typeof body?.label === 'string' ? body.label.slice(0, 80) : 'Consensus Seeker';
  const avgConsensusSupport =
    typeof body?.avgConsensusSupport === 'number' ? Math.max(0, Math.min(100, Math.round(body.avgConsensusSupport))) : 0;
  const urlText = typeof body?.urlText === 'string' ? body.urlText.slice(0, 120) : undefined;

  const policies = clampArray(body?.policies, 10).map((p) => ({
    id: typeof p?.id === 'string' ? p.id.slice(0, 120) : '',
    title: typeof p?.title === 'string' ? p.title.slice(0, 120) : '',
    category: typeof p?.category === 'string' ? p.category.slice(0, 40) : 'other',
    averageSupport:
      typeof p?.averageSupport === 'number' ? Math.max(0, Math.min(100, Math.round(p.averageSupport))) : 0,
  })).filter((p) => p.id && p.title);

  return { displayName, label, avgConsensusSupport, policies, urlText };
}

const app = express();
app.use(express.json({ limit: '2mb' }));

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes('*')) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error('Origin not allowed by CORS'));
    },
  })
);

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

app.post('/render/policy-wrapped-square', async (req, res) => {
  try {
    const inputProps = sanitizePayload(req.body);
    if (!inputProps.policies.length) {
      res.status(400).json({ error: 'No policies provided' });
      return;
    }

    const serveUrl = await getServeUrl();
    const outPath = path.join(os.tmpdir(), `policy-wrapped-${Date.now()}.mp4`);

    await renderMedia({
      serveUrl,
      composition: 'PolicyWrappedSquare',
      codec: 'h264',
      outputLocation: outPath,
      inputProps,
      // High bitrate for crisp edges/text
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ffmpegOverride: (args) => [...args, '-b:v', '12M', '-maxrate', '18M', '-bufsize', '24M'],
    });

    const file = await fs.readFile(outPath);
    await fs.unlink(outPath).catch(() => undefined);

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="policy-wrapped.mp4"');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(file);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    res.status(500).json({
      error:
        `Render failed: ${msg}. ` +
        'Ensure FFmpeg is installed and available on PATH for this render server.',
    });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Remotion render server listening on http://localhost:${PORT}`);
});


