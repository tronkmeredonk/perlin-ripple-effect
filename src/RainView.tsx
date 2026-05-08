import { useState } from "react";
import SandFallAnimation from "./SandFallAnimation";
import ControlsPanel, { type Slider } from "./ControlsPanel";
import usePersistentState from "./usePersistentState";
import styles from "./MockupView.module.css";

const MODAL_WIDTH = 968;
const MODAL_HEIGHT = 446;

export default function RainView() {
  const [playId, setPlayId] = useState(0);

  const [particleCount, setParticleCount] = usePersistentState("rn.particleCount", 800);
  const [spawnDuration, setSpawnDuration] = usePersistentState("rn.spawnDuration", 2.2);
  const [gravity, setGravity] = usePersistentState("rn.gravity", 1200);
  const [maxFallSpeed, setMaxFallSpeed] = usePersistentState("rn.maxFallSpeed", 1500);
  const [jitter, setJitter] = usePersistentState("rn.jitter", 6);
  const [dotRadius, setDotRadius] = usePersistentState("rn.dotRadius", 1.5);
  const [dotOpacity, setDotOpacity] = usePersistentState("rn.dotOpacity", 0.55);
  const [spawnAbove, setSpawnAbove] = usePersistentState("rn.spawnAbove", 12);

  const replay = () => setPlayId((n) => n + 1);

  const sliders: Slider[] = [
    { label: "Particle count", value: particleCount, set: setParticleCount, min: 50, max: 3000, step: 10 },
    { label: "Spawn duration (s)", value: spawnDuration, set: setSpawnDuration, min: 0.2, max: 6, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Gravity", value: gravity, set: setGravity, min: 100, max: 4000, step: 50 },
    { label: "Max fall speed", value: maxFallSpeed, set: setMaxFallSpeed, min: 200, max: 4000, step: 50 },
    { label: "Horizontal jitter", value: jitter, set: setJitter, min: 0, max: 60, step: 1 },
    { label: "Dot radius", value: dotRadius, set: setDotRadius, min: 0.5, max: 6, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Dot opacity", value: dotOpacity, set: setDotOpacity, min: 0.05, max: 1, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Spawn offset above (px)", value: spawnAbove, set: setSpawnAbove, min: 0, max: 200, step: 1 },
  ];

  return (
    <div className={styles.shell}>
      <div
        className={styles.modal}
        style={{ width: MODAL_WIDTH, height: MODAL_HEIGHT }}
      >
        <button
          type="button"
          className={styles.closeBtn}
          aria-label="Replay"
          onClick={replay}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={styles.screenA}>
          <div className={styles.sandWrap}>
            <SandFallAnimation
              width={MODAL_WIDTH}
              height={MODAL_HEIGHT}
              playId={playId}
              particleCount={particleCount}
              spawnDuration={spawnDuration}
              gravity={gravity}
              maxFallSpeed={maxFallSpeed}
              jitter={jitter}
              dotRadius={dotRadius}
              dotColor={`rgba(255,255,255,${dotOpacity})`}
              spawnAbove={spawnAbove}
              className={styles.sandCanvas}
            />
          </div>

          <div className={styles.contentA}>
            <div className={styles.badge}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="rgba(255,255,255,0.3)" />
                <path
                  d="M4.5 8.5L6.5 10.5L11.5 5.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Your first deposit has arrived</span>
            </div>

            <div className={styles.titleGroup}>
              <div className={styles.bigNumber}>$100</div>
              <div className={styles.sublabel}>
                Deposited into Mercury checking
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.panelStack}>
        <ControlsPanel sliders={sliders} title="Rain" inline />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionBtn} onClick={replay}>
          Replay
        </button>
      </div>
    </div>
  );
}
