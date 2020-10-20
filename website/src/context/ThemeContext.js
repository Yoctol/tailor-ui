// eslint-disable-next-line import/no-extraneous-dependencies
import { createContext } from 'react';

const ThemeContext = createContext({ themeKey: 'base', setThemeKey: () => {} });

export default ThemeContext;
