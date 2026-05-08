import { useEffect, useState } from "react";
import RippleAnimation from "./RippleAnimation";
import ControlsPanel, { type Slider } from "./ControlsPanel";
import usePersistentState from "./usePersistentState";
import styles from "./MockupView.module.css";

const MODAL_WIDTH = 968;
const MODAL_HEIGHT = 446;
const RIPPLE_SIZE = 968;

export default function MockupView() {
  const [playId, setPlayId] = useState(0);
  const [paused, setPaused] = useState(false);

  const [screen, setScreen] = useState<"a" | "b">("a");

  const [morphMs, setMorphMs] = usePersistentState("mu.morphMs", 2400);
  const [fadeOutMs, setFadeOutMs] = usePersistentState("mu.fadeOutMs", 400);
  const [fadeInMs, setFadeInMs] = usePersistentState("mu.fadeInMs", 400);
  const [fadeInDelayMs, setFadeInDelayMs] = usePersistentState("mu.fadeInDelayMs", 150);

  const [staggerCount, setStaggerCount] = usePersistentState("mu.staggerCount", 3);
  const [duration, setDuration] = usePersistentState("mu.duration", 2);
  const [uniformCount, setUniformCount] = usePersistentState("mu.uniformCount", 25);
  const [randomCount, setRandomCount] = usePersistentState("mu.randomCount", 50);
  const [rStart, setRStart] = usePersistentState("mu.rStart", 70);
  const [rEnd, setREnd] = usePersistentState("mu.rEnd", 420);
  const [noiseAmplitude, setNoiseAmplitude] = usePersistentState("mu.noiseAmplitude", 20);
  const [noiseFreq, setNoiseFreq] = usePersistentState("mu.noiseFreq", 0.15);
  const [noiseSpeed, setNoiseSpeed] = usePersistentState("mu.noiseSpeed", 0.4);
  const [dotRadius, setDotRadius] = usePersistentState("mu.dotRadius", 1.5);
  const [dotOpacity, setDotOpacity] = usePersistentState("mu.dotOpacity", 0.9);
  const [shrinkFactor, setShrinkFactor] = usePersistentState("mu.shrinkFactor", 0.5);

  useEffect(() => {
    setScreen("a");

    if (paused) return;

    const t = window.setTimeout(() => setScreen("b"), morphMs);
    return () => window.clearTimeout(t);
  }, [playId, paused, morphMs]);

  const replay = () => setPlayId((n) => n + 1);

  const sliders: Slider[] = [
    { label: "Number of circles", value: staggerCount, set: setStaggerCount, min: 1, max: 8, step: 1 },
    { label: "Duration (s)", value: duration, set: setDuration, min: 0.2, max: 5, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Uniform dots", value: uniformCount, set: setUniformCount, min: 0, max: 200, step: 1 },
    { label: "Random dots", value: randomCount, set: setRandomCount, min: 0, max: 400, step: 1 },
    { label: "Start radius", value: rStart, set: setRStart, min: 0, max: 300, step: 1 },
    { label: "End radius", value: rEnd, set: setREnd, min: 50, max: 600, step: 1 },
    { label: "Ring shrink ×", value: shrinkFactor, set: setShrinkFactor, min: 0.1, max: 1, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Noise amplitude", value: noiseAmplitude, set: setNoiseAmplitude, min: 0, max: 100, step: 1 },
    { label: "Noise frequency", value: noiseFreq, set: setNoiseFreq, min: 0.01, max: 1, step: 0.01, format: (v) => v.toFixed(2) },
    { label: "Noise speed", value: noiseSpeed, set: setNoiseSpeed, min: 0, max: 2, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Dot radius", value: dotRadius, set: setDotRadius, min: 0.5, max: 6, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Dot opacity", value: dotOpacity, set: setDotOpacity, min: 0.05, max: 1, step: 0.05, format: (v) => v.toFixed(2) },
  ];

  const fadeSliders: Slider[] = [
    { label: "Morph delay (s)", value: morphMs / 1000, set: (v) => setMorphMs(v * 1000), min: 0, max: 6, step: 0.1, format: (v) => v.toFixed(1) },
    { label: "Fade out (s)", value: fadeOutMs / 1000, set: (v) => setFadeOutMs(v * 1000), min: 0, max: 2, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Fade in (s)", value: fadeInMs / 1000, set: (v) => setFadeInMs(v * 1000), min: 0, max: 2, step: 0.05, format: (v) => v.toFixed(2) },
    { label: "Fade in delay (s)", value: fadeInDelayMs / 1000, set: (v) => setFadeInDelayMs(v * 1000), min: 0, max: 2, step: 0.05, format: (v) => v.toFixed(2) },
  ];

  const onB = screen === "b";

  return (
    <div className={styles.shell}>
      <div
        className={styles.modal}
        style={{ width: MODAL_WIDTH, height: MODAL_HEIGHT }}
      >
        <button
          type="button"
          className={`${styles.closeBtn} ${onB ? styles.closeBtnDark : ""}`}
          aria-label="Close"
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

        <div
          className={`${styles.screenA} ${onB ? styles.screenAExit : ""}`}
          style={{ transition: `opacity ${fadeOutMs}ms ease` }}
        >
          <div className={styles.rippleWrap}>
            <RippleAnimation
              size={RIPPLE_SIZE}
              playId={playId}
              staggerCount={staggerCount}
              duration={duration}
              uniformCount={uniformCount}
              randomCount={randomCount}
              rStart={rStart}
              rEnd={rEnd}
              shrinkFactor={shrinkFactor}
              noiseAmplitude={noiseAmplitude}
              noiseFreq={noiseFreq}
              noiseSpeed={noiseSpeed}
              dotRadius={dotRadius}
              dotColor={`rgba(255,255,255,${dotOpacity})`}
              className={styles.rippleCanvas}
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

        <div
          className={`${styles.screenB} ${onB ? styles.screenBActive : ""}`}
          style={{
            transition: `opacity ${fadeInMs}ms ease ${fadeInDelayMs}ms`,
          }}
        >
          <div className={styles.screenBBody}>
            <div className={styles.pillB}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#188554" />
                <path
                  d="M4.5 8.5L6.5 10.5L11.5 5.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Your $100 deposit has arrived</span>
            </div>

            <div className={styles.screenBContent}>
              <h2 className={styles.bHeadline}>
                A higher balance lets you do more
              </h2>
              <p className={styles.bSubhead}>
                You can organize money into sub-accounts, access higher credit
                limits, and more.
              </p>

              <div className={styles.accountChips}>
                <div className={styles.chipGroup}>
                  <div className={styles.dsLabel}>Transferring From</div>
                  <div className={styles.chip}>
                    <div
                      className={styles.chipIcon}
                      style={{ background: "#1a3a8f" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect width="18" height="18" rx="9" fill="#1a3a8f" />
                        <path
                          d="M9 4.5C6.5 4.5 4.5 6.5 4.5 9C4.5 11.5 6.5 13.5 9 13.5C11.5 13.5 13.5 11.5 13.5 9"
                          stroke="white"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <circle cx="11.5" cy="5.5" r="1.5" fill="white" />
                      </svg>
                    </div>
                    <div>
                      <div className={styles.chipName}>
                        Chase Checking ••1234
                      </div>
                      <div className={styles.chipSub}>
                        $560,000.00 / Linked with Plaid
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.chipArrow}>→</div>

                <div className={styles.chipGroup}>
                  <div className={styles.dsLabel}>Transferring To</div>
                  <div className={styles.chip}>
                    <div
                      className={styles.chipIcon}
                      style={{ background: "var(--ds-background-tertiary)" }}
                    >
                      <img
                        src="/assets/mercury-logo-icon.svg"
                        alt="Mercury"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <div className={styles.chipName}>Mercury Checking</div>
                      <div className={styles.chipSub}>
                        $100.00 / Checking ••1234
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.amountFieldWrap}>
                <div className={styles.dsLabel}>Amount</div>
                <div className={styles.amountField}>
                  <span>$</span>
                  <input type="text" placeholder="" />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.screenBFooter}>
            <span className={styles.notNow}>Not now</span>
            <div className={styles.footerActions}>
              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`}>
                Other transfer options
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
                Confirm transfer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.panelStack}>
        <ControlsPanel sliders={sliders} title="Ripple" inline />
        <ControlsPanel sliders={fadeSliders} title="Transition" inline />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.actionBtn} ${paused ? styles.actionBtnActive : ""}`}
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
        >
          {paused ? "Resume" : "Stay on screen 1"}
        </button>
        <button type="button" className={styles.actionBtn} onClick={replay}>
          Replay
        </button>
      </div>
    </div>
  );
}
