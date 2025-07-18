import { useCats } from "./useCats";
import "./styles.css";
import type { DisplayedCatsProps } from "./types";
import { COUNT_IMAGES } from "../constants";
import { FavoritesIcon } from "../FavoritesIcon/FavoritesIcon";
import { ClipLoader } from "react-spinners";

export const Cats = ({
  activeTab,
  addFavorites,
  deleteFavorites,
  favorites,
  isFavorite,
}: DisplayedCatsProps) => {
  const { loading, cats, error, loadMoreCats } = useCats();

  const tabData = { all: cats, favoritesCats: favorites };

  const imagesCats = tabData[activeTab];

  if (loading && imagesCats.length === 0) {
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
      <ul className="cats-grid">
        {imagesCats.map((cat) => (
          <li key={cat.id} className="cat-card">
            <div
              className="cat-image-container"
              onClick={isFavorite(cat.id) ? () => deleteFavorites(cat) : () => addFavorites(cat)}
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
      {activeTab === "all" && imagesCats.length > 0 && (
        <div className="btn-container">
          <button
            className="btn-pagination"
            onClick={() => loadMoreCats(COUNT_IMAGES)}
          >
            {loading ? "Загрузка..." : "Загрузить еще котиков"}
          </button>
        </div>
      )}
    </div>
  );
};
