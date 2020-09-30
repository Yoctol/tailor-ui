/* eslint camelcase: off */
import React, { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '../GlobalStyle';
import { HooksMessageProvider } from '../message/HooksMessageProvider';
import { HooksModalProvider } from '../Modal/HooksModalProvider';
import { LocaleProvider } from '../locale/LocaleProvider';
import { LocaleType, locales } from '../locale';
import { ThemeType, theme as defaultTheme, fontStyle } from '../theme';

import { UIDProvider } from './UIDContext';

const { en_US } = locales;

export interface UIProviderProps {
  children: ReactNode;
  locale?: LocaleType;
  theme?: ThemeType;
}

const UIProvider: FC<UIProviderProps> = ({
  children,
  theme = defaultTheme,
  locale = en_US,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider locale={locale}>
        <UIDProvider>
          <HooksModalProvider>
            <HooksMessageProvider>
              <Helmet>
                <style type="text/css">{fontStyle}</style>
              </Helmet>
              <GlobalStyle />
              {children}
            </HooksMessageProvider>
          </HooksModalProvider>
        </UIDProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
};

export { UIProvider };
