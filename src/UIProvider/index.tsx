/* eslint camelcase: "off" */
import React, { SFC, createContext } from 'react';

import { ThemeProvider } from 'utils/styled-components';

import defaultTheme from '../theme';
import injectGlobalCss from '../injectGlobalCss';
import * as locales from '../locale';

const { en_US } = locales;

type LocaleType = typeof locales.en_US;

const { Provider, Consumer: LocaleConsumer } = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

// eslint-disable-next-line import/no-mutable-exports
let globalLocale: LocaleType = en_US;

export interface UIProviderProps {
  children: JSX.Element;
  locale?: LocaleType;
  theme?: typeof defaultTheme;
}

const UIProvider: SFC<UIProviderProps> = ({
  children,
  theme = defaultTheme,
  locale = en_US,
}) => {
  injectGlobalCss();
  globalLocale = locale;

  return (
    <ThemeProvider theme={theme}>
      <Provider value={{ locale }}>{children}</Provider>
    </ThemeProvider>
  );
};

export { LocaleConsumer, globalLocale };

export default UIProvider;
