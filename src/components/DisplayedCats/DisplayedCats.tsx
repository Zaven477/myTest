import { useDisplayedCats } from "./useDispayedCats";
import "./styles.css";
import { useEffect } from "react";
import type { Cat } from "./types";
import { HeartIcon } from "../HeartIcon";
import { COUNT_IMAGES } from "../constants";
import { useInView } from "react-intersection-observer";

interface DisplayedCatsProps {
  activeTab: string;
  toggleFavorite: (arg: Cat) => void;
  isFavorite: (id: string) => boolean;
  favorites: Cat[];
}

export const DispayedCats = ({
  activeTab,
  toggleFavorite,
  favorites,
  isFavorite,
}: DisplayedCatsProps) => {
  const countImages = 24;
  const { loading, hasMore, getImages, cats } = useDisplayedCats();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  

  useEffect(() => {
    if (inView && hasMore && !loading && activeTab === "all") {
      getImages(COUNT_IMAGES);
    }
  }, [inView, hasMore, loading, getImages, activeTab]);

  const displayedCats = activeTab === "all" ? cats : favorites;

  return (
    <main className="main">
      {loading && displayedCats.length < countImages ? (
        <div className="loading-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="cats-grid">
            {displayedCats.map((cat, index) => (
              <div
                key={cat.id}
                className="cat-card"
                ref={
                  activeTab === "all" && index === displayedCats.length - 1
                    ? ref
                    : null
                }
              >
                <div className="cat-image-container">
                  <img
                    src={cat.url}
                    alt="Котик"
                    loading="lazy"
                    onLoad={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = "1";
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  <button
                    className={`favorite-btn ${
                      isFavorite(cat.id) ? "favorited" : ""
                    }`}
                    onClick={() => toggleFavorite(cat)}
                  >
                    <HeartIcon isFilled={isFavorite(cat.id)} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};
