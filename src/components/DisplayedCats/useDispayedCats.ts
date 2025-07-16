import { useCallback, useEffect, useState } from "react";
import type { Cat } from "./types";
import { fetchCats } from "../../api";
import { COUNT_IMAGES } from "../constants";

export const useDisplayedCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getImages = useCallback(async (countImages: number) => {
    setLoading(true);

    try {
      const response = await fetchCats(countImages);

      setCats((prevCats) => {
        const exsistingIds = new Set(prevCats.map((cat) => cat.id));
        const uniqueCats = response.filter(
          (cat: Cat) => !exsistingIds.has(cat.id)
        );
        return [...prevCats, ...uniqueCats];
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [])

  const loadMoreCats = useCallback(
    (countCats: number) => {
      getImages(countCats);
    },
    [getImages]
  );

  useEffect(() => {
    getImages(COUNT_IMAGES);
  }, [getImages]);

  return { cats, loading, error, getImages, loadMoreCats };
};
