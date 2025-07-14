import { useState } from "react";
import type { TabType } from "./types";

export const useTabs = (tabs: TabType[]) => {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0]);

  const setTab = (tab: TabType) => setActiveTab(tab);

  return { activeTab, setTab };
};
