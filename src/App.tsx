import { useState } from "react";
import PerlinRipple from "./PerlinRipple";
import MockupView from "./MockupView";
import styles from "./App.module.css";

type Tab = "playground" | "mockup";

export default function App() {
  const [tab, setTab] = useState<Tab>("playground");

  return (
    <div className={styles.app}>
      <nav className={styles.tabs}>
        <button
          type="button"
          className={tab === "playground" ? styles.tabActive : styles.tab}
          onClick={() => setTab("playground")}
        >
          Playground
        </button>
        <button
          type="button"
          className={tab === "mockup" ? styles.tabActive : styles.tab}
          onClick={() => setTab("mockup")}
        >
          UI Mockup
        </button>
      </nav>

      {tab === "playground" ? <PerlinRipple /> : <MockupView />}
    </div>
  );
}
