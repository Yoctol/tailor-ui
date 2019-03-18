import { MutableRefObject, createContext } from 'react';

import { Trigger } from './EffectModal';

export default createContext<MutableRefObject<Trigger>>({
  current: () => Promise.resolve(false),
});
