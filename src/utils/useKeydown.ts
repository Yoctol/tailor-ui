import { useEffect } from 'react';

export interface IKeydownProps {
  onKeydown: () => void;
  keyCode: number;
}

export const ESC_KEY_CODE = 27;

const useKeydown = ({ keyCode: targetKeyCode, onKeydown }: IKeydownProps) => {
  const handleKeydown = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === targetKeyCode) {
      onKeydown();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return window.removeEventListener('keydown', handleKeydown);
  });

  return null;
};

export default useKeydown;
