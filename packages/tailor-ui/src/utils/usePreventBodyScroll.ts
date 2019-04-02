import { preventBodyScroll } from '@tailor-ui/utils';
import { useEffect } from 'react';

const usePreventBodyScroll = (preventScroll: boolean) => {
  useEffect(() => {
    preventBodyScroll(preventScroll);

    return () => preventBodyScroll(false);
  }, [preventScroll]);
};

export default usePreventBodyScroll;
