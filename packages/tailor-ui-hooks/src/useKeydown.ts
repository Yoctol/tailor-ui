import { useCallback, useEffect } from 'react';

export interface Keydown {
  listening?: boolean;
  onKeydown?: () => void;
  keyCode: number;
}

export const ESC_KEY_CODE = 27;

const useKeydown = ({
  listening = true,
  keyCode: targetKeyCode,
  onKeydown,
}: Keydown) => {
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === targetKeyCode && onKeydown) {
        onKeydown();
      }
    },
    [targetKeyCode, onKeydown]
  );

  useEffect(() => {
    if (listening) {
      document.body.addEventListener('keydown', handleKeydown);

      return () => {
        document.body.removeEventListener('keydown', handleKeydown, false);
      };
    }

    document.body.removeEventListener('keydown', handleKeydown, false);
    return () => {};
  }, [listening, targetKeyCode, onKeydown, handleKeydown]);

  return null;
};

export { useKeydown };
