/* eslint camelcase: off */
import React, { FunctionComponent, ReactNode, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import EffectModal from '../Modal/EffectModal';
import EffectModalContext from '../Modal/EffectModalContext';
import GlobalStyle from '../GlobalStyle';
import defaultTheme from '../theme';
import locales from '../locale';

import LocaleContext, { LocaleType } from './LocaleContext';

// eslint-disable-next-line @typescript-eslint/camelcase
const { en_US } = locales;

export interface UIProviderProps {
  children: ReactNode;
  locale?: LocaleType;
  theme?: typeof defaultTheme;
}

const UIProvider: FunctionComponent<UIProviderProps> = ({
  children,
  theme = defaultTheme,
  locale = en_US,
}) => {
  const triggerRef = useRef(() => Promise.resolve(false));

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <LocaleContext.Provider value={{ locale }}>
          <EffectModalContext.Provider value={triggerRef}>
            {children}
          </EffectModalContext.Provider>
        </LocaleContext.Provider>
        <EffectModal locale={locale} triggerRef={triggerRef} />
      </>
    </ThemeProvider>
  );
};

export default UIProvider;
