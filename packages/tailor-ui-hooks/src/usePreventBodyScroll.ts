import { useEffect } from 'react';

import { preventBodyScroll } from '@tailor-ui/utils';

const usePreventBodyScroll = (preventScroll: boolean) => {
  useEffect(() => {
    preventBodyScroll(preventScroll);

    return () => preventBodyScroll(false);
  }, [preventScroll]);
};

export default usePreventBodyScroll;
