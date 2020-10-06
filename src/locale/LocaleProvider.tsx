/* eslint camelcase: off */
import React, { FC, createContext } from 'react';

import { LocaleType, en_US } from './locales';

const LocaleContext = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

LocaleContext.displayName = 'LocaleContext';

const LocaleProvider: FC<{ locale: LocaleType }> = ({ children, locale }) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleContext, LocaleProvider };
