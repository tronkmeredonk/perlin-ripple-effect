import { useState } from "react";
import RippleAnimation from "./RippleAnimation";
import ControlsPanel, { type Slider } from "./ControlsPanel";
import styles from "./PerlinRipple.module.css";

export default function PerlinRipple() {
  const [playId, setPlayId] = useState(0);

  const [staggerCount, setStaggerCount] = useState(3);
  const [duration, setDuration] = useState(2);
  const [uniformCount, setUniformCount] = useState(25);
  const [randomCount, setRandomCount] = useState(50);
  const [rStart, setRStart] = useState(70);
  const [rEnd, setREnd] = useState(250);
  const [noiseAmplitude, setNoiseAmplitude] = useState(20);
  const [noiseFreq, setNoiseFreq] = useState(0.15);
  const [noiseSpeed, setNoiseSpeed] = useState(0.4);
  const [dotRadius, setDotRadius] = useState(1.5);
  const [shrinkFactor, setShrinkFactor] = useState(0.5);

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
