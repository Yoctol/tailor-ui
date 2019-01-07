import { createContext } from 'react';

const MenuContext = createContext<{
  subMenuVisible: boolean;
  activeSubId: string;
  setActiveSubId: (subId: string | null) => void;
  activeItemId: string;
  setActiveItemId: (itemId: string) => void;
  subMenuContentSpringProps: any;
}>({
  subMenuVisible: false,
  activeSubId: '',
  setActiveSubId: () => {},
  activeItemId: '',
  setActiveItemId: () => {},
  subMenuContentSpringProps: {},
});

export default MenuContext;
