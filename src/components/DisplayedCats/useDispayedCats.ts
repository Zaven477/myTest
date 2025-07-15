import { useCallback, useEffect, useState } from "react";
import type { Cat } from "./types";
import { fetchCats } from "../../api";
import { COUNT_IMAGES } from "../constants";

export const useDisplayedCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = new Set();
  const uniqCatsById = cats.filter((cat) => {
    if(set.has(cat.id)) {
      return false;
    }
    set.add(cat.id)
    return true;
  })


  const getImages = useCallback(async (countImages: number) => {
    if (!hasMore) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetchCats(countImages);

      if (response.length < countImages) {
        setHasMore(false);
      }
      setCats((prevCats) => [...prevCats, ...response]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [hasMore])


  useEffect(() => {
    getImages(COUNT_IMAGES);
  }, [getImages]);
  

  return {uniqCatsById, loading, error, hasMore, getImages}
};
