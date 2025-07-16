import { Cats } from "../Cats/Cats";
import { useFavoritesCats } from "../Cats/useFavoritesCats";
import { Header } from "../Header/Header";
import type { Tab, TabType } from "../Header/types";
import "./style.css";
import { useState } from "react";
import { Tabs } from "./types";

export const Layout = () => {
  const { favorites, addToFavorite, deleteFavorite,  isFavorite } = useFavoritesCats();

  const tabs: Tab[] = [
    { id: "all", label: "Все котики" },
    { id: "favoritesCats", label: "Любимые котики", badge: favorites.length },
  ];

  const [activeTab, setActiveTab] = useState<TabType>(Tabs.All);

  return (
    <main className="app">
      <Header tabs={tabs} activeTab={activeTab} setTab={setActiveTab} />
      <Cats
        activeTab={activeTab}
        favorites={favorites}
        addFavorites={addToFavorite}
        deleteFavorites={deleteFavorite}
        isFavorite={isFavorite}
      />
    </main>
  );
};
