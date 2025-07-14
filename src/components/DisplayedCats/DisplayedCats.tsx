import { useDisplayedCats } from "./useDispayedCats";
import "./styles.css";
import { useEffect } from "react";
import type { DisplayedCatsProps } from "./types";
import { COUNT_IMAGES } from "../constants";
import { useInView } from "react-intersection-observer";
import { HeartIcon } from "../HeartIcon/HeartIcon";

export const DispayedCats = ({
  activeTab,
  toggleFavorite,
  favorites,
  isFavorite,
}: DisplayedCatsProps) => {
  const { loading, hasMore, getImages, cats, error } = useDisplayedCats();
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !loading && activeTab === "all") {
      getImages(COUNT_IMAGES);
    }
  }, [inView, hasMore, loading, getImages, activeTab]);

  const tabData = { all: cats, favorites: favorites };

  const displayedCats = tabData[activeTab];

  if (loading && displayedCats.length === 0) {
    return (
      <div className="loading-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if(error) {
    return <div className="error-message">{error}</div>
  }

  return (
    <main className="main">
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
              <div
                className="cat-image-container"
                onClick={() => toggleFavorite(cat)}
              >
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
                >
                  <HeartIcon isFilled={isFavorite(cat.id)} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    </main>
  );
};
