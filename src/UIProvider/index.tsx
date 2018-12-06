/* eslint camelcase: "off" */
import React, { FunctionComponent, createContext } from 'react';
import moment from 'moment';

import { ThemeProvider } from 'utils/styled-components';

import GlobalStyle from '../GlobalStyle';
import defaultTheme from '../theme';
import locales from '../locale';

const { en_US } = locales;

export type LocaleType = typeof locales.en_US;

export const LocaleContext = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

const { Provider, Consumer: LocaleConsumer } = LocaleContext;

// eslint-disable-next-line import/no-mutable-exports
let globalLocale: LocaleType = en_US;

export interface IUIProviderProps {
  children: JSX.Element;
  locale?: LocaleType;
  theme?: typeof defaultTheme;
  skipLocale?: boolean;
}

const UIProvider: FunctionComponent<IUIProviderProps> = ({
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
