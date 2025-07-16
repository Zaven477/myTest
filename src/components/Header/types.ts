export type TabType =  'all' | 'favoritesCats';

export interface Tab {
  id: TabType;
  label: string;
  badge?: number;
}

export interface HeaderProps {
  tabs: Tab[];
  activeTab: TabType;
  setTab: (tab: TabType) => void;
}