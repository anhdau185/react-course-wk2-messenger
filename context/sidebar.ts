import { createContext, useContext } from 'react';
import noop from 'lodash/fp/noop';

export interface SidebarContextValues {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextValues>({
  isSidebarOpen: false,
  openSidebar: noop,
  closeSidebar: noop
});

export const useSidebar = () => useContext(SidebarContext);
