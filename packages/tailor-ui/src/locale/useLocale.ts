import { useContext } from 'react';

import { LocaleContext } from './LocaleProvider';

const useLocale = () => useContext(LocaleContext);

export { useLocale };
