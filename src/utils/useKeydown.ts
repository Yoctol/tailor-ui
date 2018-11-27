import { useEffect } from 'react';

export interface IKeydownProps {
  onKeydown?: () => void;
  keyCode: number;
}

export const ESC_KEY_CODE = 27;

const useKeydown = ({ keyCode: targetKeyCode, onKeydown }: IKeydownProps) => {
  useEffect(
    () => {
      const handleKeydown = (event: KeyboardEvent) => {
        if (event.keyCode === targetKeyCode && onKeydown) {
          onKeydown();
        }
      };

      window.addEventListener('keydown', handleKeydown);

      return () => window.removeEventListener('keydown', handleKeydown);
    },
    [targetKeyCode, onKeydown]
  );

  return null;
};

export default useKeydown;
