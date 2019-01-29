import { createContext } from 'react';

const MenuContext = createContext<{
  subMenuVisible: boolean;
  activeSubId: string | null;
  setActiveSubId: (subId: string | null) => void;
  activeItemId: string | null;
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
