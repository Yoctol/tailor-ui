/* eslint camelcase: "off" */
import React, { FunctionComponent, ReactNode } from 'react';
import moment from 'moment';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../GlobalStyle';
import defaultTheme from '../theme';
import locales from '../locale';

import LocaleContext, { LocaleType } from './LocaleContext';

const { enUS } = locales;

// eslint-disable-next-line import/no-mutable-exports
let globalLocale: LocaleType = enUS;

export interface UIProviderProps {
  children: ReactNode;
  locale?: LocaleType;
  theme?: typeof defaultTheme;
  skipLocale?: boolean;
}

const UIProvider: FunctionComponent<UIProviderProps> = ({
  children,
  theme = defaultTheme,
  locale = enUS,
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
        <LocaleContext.Provider value={{ locale }}>
          {children}
        </LocaleContext.Provider>
      </>
    </ThemeProvider>
  );
};

export { globalLocale };

export default UIProvider;
