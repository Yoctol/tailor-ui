import { createContext } from 'react';

const ThemeContext = createContext({ themeKey: 'base', setThemeKey: () => {} });

export default ThemeContext;
