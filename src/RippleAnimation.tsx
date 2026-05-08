import { useRef, useEffect, useMemo } from "react";
import { solveCubicBezier, noise2D, seededRandom } from "./perlin";

const ease = solveCubicBezier(0.7, 0, 0.1, 1);

export type RippleProps = {
  size?: number;
  staggerCount?: number;
  duration?: number;
  uniformCount?: number;
  randomCount?: number;
  rStart?: number;
  rEnd?: number;
  noiseAmplitude?: number;
  noiseFreq?: number;
  noiseSpeed?: number;
  dotRadius?: number;
  shrinkFactor?: number;
  dotColor?: string;
  /** Bump this number to replay the animation. */
  playId?: number;
  className?: string;
};

export default function RippleAnimation({
  size = 1000,
  staggerCount = 3,
  duration = 2,
  uniformCount = 25,
  randomCount = 50,
  rStart = 70,
  rEnd = 250,
  noiseAmplitude = 20,
  noiseFreq = 0.15,
  noiseSpeed = 0.4,
  dotRadius = 1.5,
  shrinkFactor = 0.5,
  dotColor = "black",
  playId = 0,
  className,
}: RippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const circles = useMemo(() => {
    return Array.from({ length: staggerCount }, (_, i) => {
      const uniform = Array.from(
        { length: uniformCount },
        (_, j) => (j / uniformCount) * Math.PI * 2
      );
      const rand = seededRandom(i * 1000 + 42);
      const random = Array.from(
        { length: randomCount },
        () => rand() * Math.PI * 2
      );
      const angles = [...uniform, ...random];
      // Per-point rest position computed once. Noise is sampled from this
      // stable position so each dot has a consistent "noise identity"
      // regardless of where its ring is in its expansion.
      return angles.map((angle) => ({
        angle,
        restX: Math.cos(angle) * rEnd,
        restY: Math.sin(angle) * rEnd,
      }));
    });
  }, [staggerCount, uniformCount, randomCount, rEnd]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const startTime = performance.now();
    const center = size / 2;

    function render(now: number) {
      const elapsed = (now - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = dotColor;

      const baseGap = duration / staggerCount / 2;
      const delayFor = (i: number) =>
        i === 0 ? 0 : baseGap * (2 - Math.pow(0.5, i - 1));
      const totalDuration = delayFor(staggerCount - 1) + duration;

      circles.forEach((points, i) => {
        const delay = delayFor(i);
        const raw = elapsed - delay;
        if (raw < 0 || raw > duration) return;

        const t = raw / duration;
        const ringStart = rStart * Math.pow(shrinkFactor, i);
        const scalar = ease(t);
        const r = ringStart + (rEnd - ringStart) * scalar;

        const opacity =
          t <= 0.5 ? ease(t / 0.5) : 1 - ease((t - 0.5) / 0.5);

        ctx.globalAlpha = opacity;

        points.forEach(({ angle, restX, restY }) => {
          const baseX = center + Math.cos(angle) * r;
          const baseY = center + Math.sin(angle) * r;

          // Sample noise at the point's stable rest position (not at its
          // moving baseX/baseY). Time still drifts the noise field for a
          // breathing feel, but the spatial seed per dot stays constant.
          const nx = noise2D(
            restX * noiseFreq,
            restY * noiseFreq + elapsed * noiseSpeed
          );
          const ny = noise2D(
            restX * noiseFreq + 100,
            restY * noiseFreq + elapsed * noiseSpeed
          );

          const x = baseX + nx * noiseAmplitude * scalar;
          const y = baseY + ny * noiseAmplitude * scalar;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      if (elapsed < totalDuration) {
        animId = requestAnimationFrame(render);
      }
    }

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    circles,
    playId,
    size,
    duration,
    staggerCount,
    rStart,
    rEnd,
    noiseAmplitude,
    noiseFreq,
    noiseSpeed,
    dotRadius,
    shrinkFactor,
    dotColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
    />
  );
}
