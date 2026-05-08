import { useEffect, useRef } from "react";
import { seededRandom } from "./perlin";

export type SandFallProps = {
  width?: number;
  height?: number;
  /** Bump this number to replay the animation. */
  playId?: number;
  particleCount?: number;
  /** Time over which all particles spawn from the top, in seconds. */
  spawnDuration?: number;
  /** Acceleration of gravity in pixels / second². */
  gravity?: number;
  /** Terminal fall speed cap, px/s. */
  maxFallSpeed?: number;
  /** Random horizontal wiggle while falling, px/s. */
  jitter?: number;
  dotRadius?: number;
  dotColor?: string;
  /** Initial vertical offset of spawn line above the canvas top, in px. */
  spawnAbove?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vy: number;
  settled: boolean;
};

export default function SandFallAnimation({
  width = 968,
  height = 446,
  playId = 0,
  particleCount = 800,
  spawnDuration = 2.2,
  gravity = 1200,
  maxFallSpeed = 1500,
  jitter = 6,
  dotRadius = 1.5,
  dotColor = "rgba(255,255,255,0.9)",
  spawnAbove = 12,
  className,
}: SandFallProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const dotDiameter = Math.max(1, dotRadius * 2);
    const cols = Math.max(1, Math.floor(width / dotDiameter));
    const colWidth = width / cols;
    const heightmap = new Float32Array(cols).fill(height);

    const rand = seededRandom(playId * 911 + 17);

    const spawnX = Array.from({ length: particleCount }, () => rand() * width);
    const spawnT = Array.from({ length: particleCount }, (_, i) =>
      (i / Math.max(1, particleCount - 1)) * spawnDuration
    );

    const particles: Particle[] = [];
    let nextSpawn = 0;
    let lastTime = 0;
    let startTime = 0;
    let rafId = 0;

    function settleParticle(p: Particle) {
      let col = Math.floor(p.x / colWidth);
      if (col < 0) col = 0;
      if (col >= cols) col = cols - 1;

      // Roll downhill — moderate slope tolerance with light random side bias
      const rollThreshold = dotDiameter * 0.75;
      for (let iter = 0; iter < 24; iter++) {
        const here = heightmap[col];
        const left = col > 0 ? heightmap[col - 1] : -Infinity;
        const right = col < cols - 1 ? heightmap[col + 1] : -Infinity;

        const leftDrop = left - here;
        const rightDrop = right - here;
        const leftWins = leftDrop > rollThreshold && leftDrop >= rightDrop;
        const rightWins = rightDrop > rollThreshold && rightDrop > leftDrop;

        if (leftWins && rightWins) {
          col += rand() < 0.5 ? -1 : 1;
        } else if (leftWins) {
          col -= 1;
        } else if (rightWins) {
          col += 1;
        } else {
          break;
        }
      }

      const colCenter = (col + 0.5) * colWidth;
      const xJitter = (rand() - 0.5) * colWidth * 0.45;
      const yJitter = (rand() - 0.5) * dotDiameter * 0.2;

      p.x = Math.max(dotRadius, Math.min(width - dotRadius, colCenter + xJitter));
      p.y = heightmap[col] - dotRadius + yJitter;
      p.settled = true;

      // Vary how much each grain raises the pile (0.85 – 1.05 of a diameter)
      heightmap[col] -= dotDiameter * (0.85 + rand() * 0.2);
    }

    function tick(now: number) {
      if (!startTime) {
        startTime = now;
        lastTime = now;
      }
      const elapsed = (now - startTime) / 1000;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      while (nextSpawn < particleCount && spawnT[nextSpawn] <= elapsed) {
        particles.push({
          x: spawnX[nextSpawn],
          y: -spawnAbove,
          vy: 0,
          settled: false,
        });
        nextSpawn += 1;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;

      let anyMoving = false;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.settled) {
          anyMoving = true;
          p.vy = Math.min(p.vy + gravity * dt, maxFallSpeed);
          p.y += p.vy * dt;
          if (jitter > 0) {
            p.x += (rand() - 0.5) * 2 * jitter * dt;
            if (p.x < 0) p.x = 0;
            if (p.x > width) p.x = width;
          }

          let col = Math.floor(p.x / colWidth);
          if (col < 0) col = 0;
          if (col >= cols) col = cols - 1;
          if (p.y + dotRadius >= heightmap[col]) {
            settleParticle(p);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const stillSpawning = nextSpawn < particleCount;
      if (stillSpawning || anyMoving) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    width,
    height,
    playId,
    particleCount,
    spawnDuration,
    gravity,
    maxFallSpeed,
    jitter,
    dotRadius,
    dotColor,
    spawnAbove,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}
