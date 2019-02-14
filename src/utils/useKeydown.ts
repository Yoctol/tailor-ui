import { useCallback, useEffect } from 'react';

export interface KeydownProps {
  listening?: boolean;
  onKeydown?: () => void;
  keyCode: number;
}

export const ESC_KEY_CODE = 27;

const useKeydown = ({
  listening = true,
  keyCode: targetKeyCode,
  onKeydown,
}: KeydownProps) => {
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
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }

    window.removeEventListener('keydown', handleKeydown);
    return () => {};
  }, [listening, targetKeyCode, onKeydown]);

  return null;
};

export default useKeydown;
