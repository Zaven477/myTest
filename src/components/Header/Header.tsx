import { useState } from "react";
import "./Header.css";
import type { Cat, Tab } from "./types";
import { useTabs } from "./hook";

export const Header = () => {
  const [favorites] = useState<Cat[]>([]);

  const tabs: Tab[] = [
    { id: "all", label: "Все котики" },
    { id: "favorites", label: `Любимые котики`, badge: favorites.length },
  ];

  const { activeTab, setTab } = useTabs(tabs.map((tab) => tab.id));

  return (
    <header className="header">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`header-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => setTab(tab.id)}
        >
          {tab.label}
          {typeof tab.badge === "number" ? ` (${tab.badge})` : null}
        </button>
      ))}
    </header>
  );
};
