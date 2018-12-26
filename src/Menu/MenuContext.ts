import { createContext } from 'react';

const MenuContext = createContext<{
  openKeys: Set<string>;
  handleToggleOpenKeys: (key: string) => void;
}>({
  openKeys: new Set([]),
  handleToggleOpenKeys: () => {},
});

export default MenuContext;
