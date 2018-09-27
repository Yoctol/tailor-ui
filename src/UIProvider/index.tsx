/* eslint camelcase: "off" */
import React, { SFC, createContext } from 'react';
import moment from 'moment';

import { ThemeProvider } from 'utils/styled-components';

import GlobalStyle from '../GlobalStyle';
import defaultTheme from '../theme';
import locales from '../locale';

const { en_US } = locales;

type LocaleType = typeof locales.en_US;

const { Provider, Consumer: LocaleConsumer } = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

// eslint-disable-next-line import/no-mutable-exports
let globalLocale: LocaleType = en_US;

export interface IUIProviderProps {
  children: JSX.Element;
  locale?: LocaleType;
  theme?: typeof defaultTheme;
  skipLocale?: boolean;
}

const UIProvider: SFC<IUIProviderProps> = ({
  children,
  theme = defaultTheme,
  locale = en_US,
  skipLocale = false,
}) => {
  if (!skipLocale) {
    globalLocale = locale;
    moment.locale(locale.momentLocale);
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Provider value={{ locale }}>{children}</Provider>
      </>
    </ThemeProvider>
  );
};

export { LocaleConsumer, globalLocale };

export default UIProvider;
