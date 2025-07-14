import { DispayedCats } from "../DisplayedCats/DisplayedCats";
import { useFavoritesCats } from "../DisplayedCats/useFavoritesCats";
import { Header } from "../Header/Header";
import type { Tab, TabType } from "../Header/types";
import "./style.css";
import { useState } from "react";


export const Layout = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavoritesCats();

  const tabs: Tab[] = [
    { id: "all", label: "Все котики" },
    { id: "favorites", label: "Любимые котики", badge: favorites.length },
  ];
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0].id);

  return (
    <div className="app">
      <Header tabs={tabs} activeTab={activeTab} setTab={setActiveTab} />
      <DispayedCats
        activeTab={activeTab}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </div>
  );
};
