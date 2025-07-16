import { useCallback, useEffect, useState } from "react";
import type { Cat } from "./types";
import { fetchCats } from "../../api";
import { COUNT_IMAGES } from "../constants";

export const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getImages = useCallback(async (countImages: number) => {
    setLoading(true);

    try {
      const response = await fetchCats(countImages);

      setCats((prevCats) => [...prevCats, ...response]);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
