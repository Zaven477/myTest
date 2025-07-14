export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DisplayedCatsProps {
  activeTab: 'all' | 'favorites';
  toggleFavorite: (arg: Cat) => void;
  isFavorite: (id: string) => boolean;
  favorites: Cat[];
}
