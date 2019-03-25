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

export default useKeydown;
