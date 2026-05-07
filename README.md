# Perlin ripple effect

Small **React + TypeScript** demo: animated particle rings with Perlin noise (from the original zip). Runs with **Vite** on your machine.

## Run locally

```bash
cd ~/Desktop/perlin-ripple-effect
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Project type

This is a standalone **Vite** app, not part of `mercury-web`. To use the effect inside Mercury, copy `src/PerlinRipple.tsx` and `src/perlin.ts` (and adapt styling to design tokens / CSS Modules there). See `INSTRUCTIONS.md` for parameter knobs.
