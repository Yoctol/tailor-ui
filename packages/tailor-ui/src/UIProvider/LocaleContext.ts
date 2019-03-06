/* eslint camelcase: off, @typescript-eslint/camelcase: off */
import { createContext } from 'react';

import locales from '../locale';

const { en_US } = locales;

export { en_US };
export type LocaleType = typeof en_US;

const LocaleContext = createContext<{
  locale: LocaleType;
}>({
  locale: en_US,
});

export default LocaleContext;
