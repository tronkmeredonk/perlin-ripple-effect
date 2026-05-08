import styles from "./ControlsPanel.module.css";

export type Slider = {
  label: string;
  value: number;
  set: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
};

type Props = {
  title?: string;
  sliders: Slider[];
  side?: "left" | "right";
  inline?: boolean;
};

export default function ControlsPanel({
  title = "Controls",
  sliders,
  side = "right",
  inline = false,
}: Props) {
  return (
    <aside
      className={`${styles.panel} ${side === "left" ? styles.panelLeft : ""} ${
        inline ? styles.panelInline : ""
      }`}
    >
      <h2 className={styles.panelTitle}>{title}</h2>
      {sliders.map((s) => (
        <label key={s.label} className={styles.control}>
          <span className={styles.controlHeader}>
            <span>{s.label}</span>
            <span className={styles.value}>
              {s.format ? s.format(s.value) : s.value}
            </span>
          </span>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={s.value}
            onChange={(e) => s.set(Number(e.target.value))}
          />
        </label>
      ))}
    </aside>
  );
}
