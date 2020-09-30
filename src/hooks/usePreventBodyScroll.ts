import { useEffect } from 'react';

import { preventBodyScroll } from '../utils';

const usePreventBodyScroll = (preventScroll: boolean) => {
  useEffect(() => {
    preventBodyScroll(preventScroll);

    return () => preventBodyScroll(false);
  }, [preventScroll]);
};

export { usePreventBodyScroll };
