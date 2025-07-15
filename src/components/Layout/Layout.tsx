import { DispayedCats } from "../DisplayedCats/DisplayedCats";
import { useFavoritesCats } from "../DisplayedCats/useFavoritesCats";
import { Header } from "../Header/Header";
import type { Tab, TabType } from "../Header/types";
import "./style.css";
import { useState } from "react";
import { Tabs } from "./types";

export const Layout = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavoritesCats();

  const tabs: Tab[] = [
    { id: "all", label: "Все котики" },
    { id: "favorites", label: "Любимые котики", badge: favorites.length },
  ];

  const [activeTab, setActiveTab] = useState<TabType>(Tabs.All);

  return (
    <main className="app">
      <Header tabs={tabs} activeTab={activeTab} setTab={setActiveTab} />
      <DispayedCats
        activeTab={activeTab}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </main>
  );
};
