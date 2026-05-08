import { useState } from "react";
import PerlinRipple from "./PerlinRipple";
import MockupView from "./MockupView";
import RainView from "./RainView";
import styles from "./App.module.css";

type Tab = "playground" | "mockup" | "rain";

const TABS: { id: Tab; label: string }[] = [
  { id: "playground", label: "Playground" },
  { id: "mockup", label: "UI Mockup" },
  { id: "rain", label: "Rain" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("playground");

  return (
    <div className={styles.app}>
      <nav className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tab === t.id ? styles.tabActive : styles.tab}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "playground" && <PerlinRipple />}
      {tab === "mockup" && <MockupView />}
      {tab === "rain" && <RainView />}
    </div>
  );
}
