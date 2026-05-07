# Perlin Noise Ripple Effect

Animated particle rings that expand outward with Perlin noise displacement. Particles start calm and get progressively noisier as they expand, then fade out.

## What it does

- 3 concentric rings of particles, each with 300 points (100 uniformly spaced + 200 random)
- Rings expand outward with staggered timing and fade in/out
- 2D Perlin noise displaces each particle, with amplitude scaled by a `scalar` (0 at start, 1 at full expansion)
- Orthogonal perspective via Y-axis squash
- Custom cubic-bezier easing: `(0.7, 0, 0.1, 1)`
- Rendered on a `<canvas>` element with `requestAnimationFrame`

## Files

- `PerlinRipple.tsx` — Self-contained React component (client component). Zero dependencies beyond React.
- `perlin.ts` — Standalone 2D Perlin noise + seeded random + cubic bezier easing utilities.

## Usage

### Next.js / React (App Router)

1. Copy both files into your project (e.g. `src/components/`)
2. Import and use the component:

```tsx
import PerlinRipple from "@/components/PerlinRipple";

export default function Page() {
  return <PerlinRipple />;
}
```

### Any React project

Same as above. The component is a standard `"use client"` React component using `useRef`, `useEffect`, `useMemo`. No framework-specific APIs.

## Configurable parameters

All parameters are defined at the top of `PerlinRipple.tsx`:

| Parameter | Default | Description |
|---|---|---|
| `staggerCount` | `3` | Number of concentric rings |
| `duration` | `5` | Full animation cycle in seconds |
| `uniformCount` | `100` | Evenly spaced points per ring |
| `randomCount` | `200` | Randomly placed points per ring |
| `rStart` | `93.75` | Starting radius (px) |
| `rEnd` | `250` | Ending radius (px) |
| `noiseAmplitude` | `20` | Max noise displacement (px) at full scalar |
| `noiseFreq` | `0.15` | Perlin noise frequency (higher = more granular) |
| `noiseSpeed` | `0.4` | How fast the noise field evolves over time |
| `ySquash` | `0.4` | Y-axis compression for orthogonal perspective (1 = flat circle) |
| `canvasSize` | `1000` | Canvas width and height in px |
| `dotRadius` | `1.5` | Radius of each particle dot |
| `dotColor` | `"black"` | Fill color of particles |

## Key concept: scalar

The `scalar` variable is normalized 0-1 and represents how far the ring has expanded from `rStart` to `rEnd`. It drives the Perlin noise amplitude:

```
noise displacement = perlinValue * noiseAmplitude * scalar
```

At `scalar = 0` (ring just appeared), particles sit exactly on the circle. At `scalar = 1` (fully expanded), particles have maximum noise displacement. This creates the effect of particles dissolving as they expand outward.

## Dependencies

- React 18+ (hooks: `useRef`, `useEffect`, `useMemo`)
- No external packages
