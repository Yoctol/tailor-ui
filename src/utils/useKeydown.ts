import { useEffect } from 'react';

export interface IKeydownProps {
  listening?: boolean;
  onKeydown?: () => void;
  keyCode: number;
}

export const ESC_KEY_CODE = 27;

const useKeydown = ({
  listening = true,
  keyCode: targetKeyCode,
  onKeydown,
}: IKeydownProps) => {
  useEffect(
    () => {
      if (listening) {
        const handleKeydown = (event: KeyboardEvent) => {
          if (event.keyCode === targetKeyCode && onKeydown) {
            onKeydown();
          }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);
      }

      return () => {};
    },
    [listening, targetKeyCode, onKeydown]
  );

  return null;
};

export default useKeydown;
