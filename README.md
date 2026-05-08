# Perlin ripple effect

Small **React + TypeScript** demo: animated particle rings with Perlin noise + a Mercury Deposit Celebration UI mockup + a falling-sand "Rain" tab. Runs with **Vite**.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/tronkmeredonk/perlin-ripple-effect)

**Live demo:** [perlin-ripple-effect.vercel.app](https://perlin-ripple-effect.vercel.app)

## Try it in your browser (no setup)

Click **Open in GitHub Codespaces** above (you need a GitHub account). It spins up a cloud VSCode with the dev server already running — about 30 seconds the first time. The Vite preview opens automatically next to the editor.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Tabs

- **Playground** — bare canvas with all the ripple parameters exposed as sliders
- **UI Mockup** — Mercury "Deposit Celebration" modal that morphs to a transfer card
- **Rain** — same modal, but with falling/settling sand particles instead of ripples

All slider values persist in `localStorage` per tab.
