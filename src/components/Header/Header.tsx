import "./Header.css";
import type { HeaderProps } from "./types";



export const Header = ({ tabs, activeTab, setTab }: HeaderProps) => {
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
