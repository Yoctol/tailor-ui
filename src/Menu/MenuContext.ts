import { createContext } from 'react';

const MenuContext = createContext<{
  openKeys: string[];
  handleToggleOpenKeys: (key: string) => void;
}>({
  openKeys: [],
  handleToggleOpenKeys: () => {},
});

export default MenuContext;
