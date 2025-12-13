import path from 'node:path';
import fs from 'node:fs/promises';
import process from 'node:process';

import { bundle } from '@remotion/bundler';
import { renderMedia } from '@remotion/renderer';

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

async function main() {
  const input = getArg('--input');
  const out = getArg('--out');

  if (!input) {
    console.error('Missing --input. Example: node scripts/render-policy-wrapped.mjs --input policy-wrapped.remotion.json --out policy-wrapped.mp4');
    process.exit(1);
  }

  const inputPath = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
  const outPath = out
    ? (path.isAbsolute(out) ? out : path.join(process.cwd(), out))
    : path.join(process.cwd(), 'policy-wrapped.mp4');

  const raw = await fs.readFile(inputPath, 'utf8');
  const inputProps = JSON.parse(raw);

  const entryPoint = path.join(process.cwd(), 'remotion', 'index.ts');
  const bundleLocation = path.join(process.cwd(), '.remotion-bundle');

  const serveUrl = await bundle({
    entryPoint,
    outDir: bundleLocation,
  });

  await renderMedia({
    serveUrl,
    composition: 'PolicyWrappedSquare',
    codec: 'h264',
    outputLocation: outPath,
    inputProps,
    // High bitrate for crisp text
    // eslint-disable-next-line no-undefined
    ffmpegOverride: (args) => [...args, '-b:v', '12M', '-maxrate', '18M', '-bufsize', '24M'],
  });

  console.log(`Rendered: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


