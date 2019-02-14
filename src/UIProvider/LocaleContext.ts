/* eslint camelcase: "off" */
import { createContext } from 'react';

import locales from '../locale';

const { enUS } = locales;

export { enUS };
export type LocaleType = typeof enUS;

const LocaleContext = createContext<{
  locale: LocaleType;
}>({
  locale: enUS,
});

export default LocaleContext;
