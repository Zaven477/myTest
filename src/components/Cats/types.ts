export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DisplayedCatsProps {
  activeTab: 'all' | 'favoritesCats';
  addFavorites: (arg: Cat) => void;
  deleteFavorites: (arg: Cat) => void;
  isFavorite: (id: string) => boolean;
  favorites: Cat[];
}
