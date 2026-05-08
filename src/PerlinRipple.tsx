import { useState } from "react";
import RippleAnimation from "./RippleAnimation";
import ControlsPanel, { type Slider } from "./ControlsPanel";
import usePersistentState from "./usePersistentState";
import styles from "./PerlinRipple.module.css";

export default function PerlinRipple() {
  const [playId, setPlayId] = useState(0);

  const [staggerCount, setStaggerCount] = usePersistentState("pg.staggerCount", 3);
  const [duration, setDuration] = usePersistentState("pg.duration", 2);
  const [uniformCount, setUniformCount] = usePersistentState("pg.uniformCount", 25);
  const [randomCount, setRandomCount] = usePersistentState("pg.randomCount", 50);
  const [rStart, setRStart] = usePersistentState("pg.rStart", 70);
  const [rEnd, setREnd] = usePersistentState("pg.rEnd", 250);
  const [noiseAmplitude, setNoiseAmplitude] = usePersistentState("pg.noiseAmplitude", 20);
  const [noiseFreq, setNoiseFreq] = usePersistentState("pg.noiseFreq", 0.15);
  const [noiseSpeed, setNoiseSpeed] = usePersistentState("pg.noiseSpeed", 0.4);
  const [dotRadius, setDotRadius] = usePersistentState("pg.dotRadius", 1.5);
  const [dotOpacity, setDotOpacity] = usePersistentState("pg.dotOpacity", 1);
  const [shrinkFactor, setShrinkFactor] = usePersistentState("pg.shrinkFactor", 0.5);

  const sliders: Slider[] = [
    { label: "Number of circles", value: staggerCount, set: setStaggerCount, min: 1, max: 8, step: 1 },
    { label: "Duration (s)", value: duration, set: setDuration, min: 0.2, max: 5, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Uniform dots", value: uniformCount, set: setUniformCount, min: 0, max: 200, step: 1 },
    { label: "Random dots", value: randomCount, set: setRandomCount, min: 0, max: 400, step: 1 },
    { label: "Start radius", value: rStart, set: setRStart, min: 0, max: 300, step: 1 },
    { label: "End radius", value: rEnd, set: setREnd, min: 50, max: 500, step: 1 },
    { label: "Ring shrink ×", value: shrinkFactor, set: setShrinkFactor, min: 0.1, max: 1, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Noise amplitude", value: noiseAmplitude, set: setNoiseAmplitude, min: 0, max: 100, step: 1 },
    { label: "Noise frequency", value: noiseFreq, set: setNoiseFreq, min: 0.01, max: 1, step: 0.01, format: (v) => v.toFixed(2) },
    { label: "Noise speed", value: noiseSpeed, set: setNoiseSpeed, min: 0, max: 2, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Dot radius", value: dotRadius, set: setDotRadius, min: 0.5, max: 6, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Dot opacity", value: dotOpacity, set: setDotOpacity, min: 0.05, max: 1, step: 0.05, format: (v) => v.toFixed(2) },
  ];

  return (
    <div className={styles.shell}>
      <RippleAnimation
        size={1000}
        playId={playId}
        staggerCount={staggerCount}
        duration={duration}
        uniformCount={uniformCount}
        randomCount={randomCount}
        rStart={rStart}
        rEnd={rEnd}
        noiseAmplitude={noiseAmplitude}
        noiseFreq={noiseFreq}
        noiseSpeed={noiseSpeed}
        dotRadius={dotRadius}
        shrinkFactor={shrinkFactor}
        dotColor={`rgba(0,0,0,${dotOpacity})`}
      />

      <ControlsPanel sliders={sliders} />

      <button
        type="button"
        className={styles.replay}
        onClick={() => setPlayId((n) => n + 1)}
      >
        Replay
      </button>
    </div>
  );
}
