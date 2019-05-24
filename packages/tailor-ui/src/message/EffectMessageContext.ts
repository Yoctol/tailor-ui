import { MutableRefObject, createContext } from 'react';

import { Trigger } from './EffectMessage';

export default createContext<MutableRefObject<Trigger>>({
  current: () => Promise.resolve(false),
});
