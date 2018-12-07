/* eslint camelcase: "off" */
import { createContext } from 'react';

import locales from '../locale';

const { en_US } = locales;

export type LocaleType = typeof locales.en_US;

const LocaleContext = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

export default LocaleContext;
