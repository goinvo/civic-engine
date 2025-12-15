This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## HQ MP4 export (Remotion render server)

This app is configured for **static export** (`output: 'export'`), so HQ MP4 rendering can’t run inside Next.js API routes in production.
Instead, we run a **separate render server** (Node + Remotion + FFmpeg) and point the frontend at it.

### 1) Install FFmpeg

The render server requires **FFmpeg** available on your PATH.

- **Windows**:
  - `winget install Gyan.FFmpeg`
  - or `choco install ffmpeg`

### 2) Start the render server

In `civic-engine-app/`:

```bash
npm run render-server
```

By default it listens on `http://localhost:8787` and exposes:
- `POST /render/policy-wrapped-square` → returns `video/mp4`
- `POST /jobs/policy-wrapped-square` → returns `{ jobId }`
- `GET /jobs/:jobId/events` → progress via Server-Sent Events (SSE)
- `GET /jobs/:jobId/file` → returns `video/mp4` when ready

### 3) Point the frontend to the render server

Set this environment variable when building/serving the frontend:

```bash
NEXT_PUBLIC_RENDERER_URL=http://localhost:8787
```

Then the `/export` page’s **Animated video (HQ)** option will offer a true one-click **Export HQ MP4** button.

### Manual fallback (no render server)

The `/export` page can also download a `policy-wrapped.remotion.json` payload, which you can render locally:

```bash
npm run remotion:render:payload -- --input policy-wrapped.remotion.json --out policy-wrapped.mp4
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
