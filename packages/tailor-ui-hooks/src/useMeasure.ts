import ResizeObserver from 'resize-observer-polyfill';
import { useEffect, useRef, useState } from 'react';

import { tuplify } from '@tailor-ui/utils';

const useMeasure = () => {
  const ref = useRef<any>(null);

  const [bounds, set] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );

  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current);
    }

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tuplify({ ref }, bounds);
};

export default useMeasure;
