/* eslint camelcase: off */
import React, { FC, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { ThemeType, theme as defaultTheme } from '@tailor-ui/theme';

import { GlobalStyle } from '../GlobalStyle';
import { HooksMessageProvider } from '../message/HooksMessageProvider';
import { HooksModalProvider } from '../Modal/HooksModalProvider';
import { LocaleProvider } from '../locale/LocaleProvider';
import { LocaleType, locales } from '../locale';

import { UIDProvider } from './UIDContext';

// eslint-disable-next-line @typescript-eslint/camelcase
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
