import { createContext } from 'react';

const LocaleContext = createContext({ locale: 'en_US', setLocale: () => {} });

export default LocaleContext;
