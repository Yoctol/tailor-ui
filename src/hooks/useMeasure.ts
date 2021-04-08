import ResizeObserver from 'resize-observer-polyfill';
import { Ref, useEffect, useRef, useState } from 'react';
import { useComposedRefs } from '@reach/utils/compose-refs';

import { tuplify } from '../utils';

const useMeasure = (targetRef: Ref<any> = null) => {
  const measureRef = useRef<any>(null);
  const ref = useComposedRefs(measureRef, targetRef);

  const [bounds, set] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    offsetWidth: 0,
    offsetHeight: 0,
  });

  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]: ResizeObserverEntry[]) => {
        set({
          left: entry.contentRect.left,
          top: entry.contentRect.top,
          width: entry.contentRect.width,
          height: entry.contentRect.height,
          offsetWidth: entry.target.clientWidth,
          offsetHeight: entry.target.clientHeight,
        });
      })
  );

  useEffect(() => {
    if (measureRef.current) {
      ro.observe(measureRef.current);
    }

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tuplify({ ref }, bounds);
};

export { useMeasure };
