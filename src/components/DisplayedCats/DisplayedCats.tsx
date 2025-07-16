import { useDisplayedCats } from "./useDispayedCats";
import "./styles.css";
import type { DisplayedCatsProps } from "./types";
import { COUNT_IMAGES } from "../constants";
import { FavoritesIcon } from "../FavoritesIcon/FavoritesIcon";
import { ClipLoader } from "react-spinners";

export const DispayedCats = ({
  activeTab,
  toggleFavorite,
  favorites,
  isFavorite,
}: DisplayedCatsProps) => {
  const { loading, cats, error, loadMoreCats } = useDisplayedCats();

  const tabData = { all: cats, favorites: favorites };

  const displayedCats = tabData[activeTab];

  if (loading && displayedCats.length === 0) {
    return (
      <div className="loading-center">
        <ClipLoader
          color="#2196f3"
          size={50}
          cssOverride={{
            borderWidth: "3px",
          }}
        />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="main">
      <ul className="cats-grid" role="list">
        {displayedCats.map((cat) => (
          <li key={cat.id} className="cat-card" role="listitem">
            <div
              className="cat-image-container"
              onClick={() => toggleFavorite(cat)}
            >
              <img src={cat.url} alt="Котик" loading="lazy" />
              <button
                className={`favorite-btn ${
                  isFavorite(cat.id) ? "favorited" : ""
                }`}
              >
                <FavoritesIcon isFilled={isFavorite(cat.id)} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {activeTab === "all" && displayedCats.length > 0 && (
        <div className="btn-container">
          <button
            className="btn-pagination"
            onClick={() => loadMoreCats(COUNT_IMAGES)}
          >
            {loading ? "Загрузка..." : "загружаем еще котиков"}
          </button>
        </div>
      )}
    </div>
  );
};
