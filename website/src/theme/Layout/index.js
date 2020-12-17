// eslint-disable-next-line import/no-unresolved
import OriginalLayout from '@theme-original/Layout';
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';

import LocaleContext from '../../context/LocaleContext';
import ThemeContext from '../../context/ThemeContext';
import { UIProvider, locales } from '../../../../src';
import { darkerTheme, theme } from '../../../../src/theme';

import './styles.css';

const themes = {
  base: theme,
  darker: darkerTheme,
};

function Layout(props) {
  const [locale, setLocale] = useState('en_US');
  const [themeKey, setThemeKey] = useState('base');

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <ThemeContext.Provider value={{ themeKey, setThemeKey }}>
        <UIProvider locale={locales[locale]} theme={themes[themeKey]}>
          <OriginalLayout {...props} />
        </UIProvider>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

export default Layout;
