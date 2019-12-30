/* eslint camelcase: off, @typescript-eslint/camelcase: off */
import React, { FC, createContext, useEffect } from 'react';
import moment from 'moment';

import { LocaleType, en_US } from './locales';

const LocaleContext = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

LocaleContext.displayName = 'LocaleContext';

const LocaleProvider: FC<{ locale: LocaleType }> = ({ children, locale }) => {
  useEffect(() => {
    moment.locale(locale.momentLocale);
  }, [locale.locale, locale.momentLocale]);

  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleContext, LocaleProvider };
