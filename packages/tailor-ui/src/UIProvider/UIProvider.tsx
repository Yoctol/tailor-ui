/* eslint camelcase: off */
import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import moment from 'moment';
import { ThemeProvider } from 'styled-components';

import { ThemeType, theme as defaultTheme } from '@tailor-ui/theme';

import EffectMessage from '../message/EffectMessage';
import EffectMessageContext from '../message/EffectMessageContext';
import EffectModal from '../Modal/EffectModal';
import EffectModalContext from '../Modal/EffectModalContext';
import locales from '../locale';
import { GlobalStyle } from '../GlobalStyle';

import LocaleContext, { LocaleType } from './LocaleContext';

// eslint-disable-next-line @typescript-eslint/camelcase
const { en_US } = locales;

export interface UIProviderProps {
  children: ReactNode;
  locale?: LocaleType;
  theme?: ThemeType;
}

const UIProvider: FunctionComponent<UIProviderProps> = ({
  children,
  theme = defaultTheme,
  locale = en_US,
}) => {
  const modalTriggerRef = useRef(() => Promise.resolve(false));
  const messageTriggerRef = useRef(() => Promise.resolve(false));

  useEffect(() => {
    moment.locale(locale.momentLocale);
  }, [locale.locale, locale.momentLocale]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <LocaleContext.Provider value={{ locale }}>
          <EffectModalContext.Provider value={modalTriggerRef}>
            <EffectMessageContext.Provider value={messageTriggerRef}>
              {children}
            </EffectMessageContext.Provider>
          </EffectModalContext.Provider>
        </LocaleContext.Provider>
        <EffectModal locale={locale} triggerRef={modalTriggerRef} />
        <EffectMessage triggerRef={messageTriggerRef} />
      </>
    </ThemeProvider>
  );
};

export { UIProvider };
