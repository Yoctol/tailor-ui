import { createContext } from 'react';

const MenuContext = createContext<{
  openKeys: string[];
  handleToggleOpenKeys: (key: string) => void;
}>({
  openKeys: [],
  handleToggleOpenKeys: () => {},
});

MenuContext.displayName = 'MenuContext';

export default MenuContext;
