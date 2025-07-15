import { useEffect, useState } from "react";
import type { Cat } from "./types";
import { FAVORITES_STORAGE_KEY } from "../constants";

export const useFavoritesCats = () => {
  const [favorites, setFavorites] = useState<Cat[]>([]);

  const toggleFavorite = (cat: Cat) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === cat.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== cat.id);
      } else {
        return [...prevFavorites, cat];
      }
    });
  };

  const isFavorite = (catId: string) => {
    return favorites.some((fav) => fav.id === catId);
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};
