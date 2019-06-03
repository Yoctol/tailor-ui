import { RefObject, useCallback, useEffect } from 'react';

export interface ClickOutside {
  listening?: boolean;
  onClickOutside: () => void;
  refs: RefObject<HTMLElement>[];
}

const useClickOutside = ({
  listening = true,
  onClickOutside,
  refs,
}: ClickOutside) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const clickInside = refs.some(ref => {
        if (!ref.current) {
          return false;
        }

        return ref.current.contains(event.target as Node);
      });

      if (!clickInside) {
        onClickOutside();
      }
    },
    [onClickOutside, refs]
  );

  useEffect(() => {
    if (listening) {
      document.body.addEventListener('click', handleClick);

      return () => {
        document.body.removeEventListener('click', handleClick, false);
      };
    }

    document.body.removeEventListener('click', handleClick, false);
    return () => {};
  }, [listening, onClickOutside, handleClick]);

  return null;
};

export { useClickOutside };
