import {
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
} from 'react';

export interface Keydown {
  listening?: boolean;
  onKeydown?: KeyboardEventHandler;
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
        onKeydown(event);
      }
    },
    [targetKeyCode, onKeydown]
  );

  useEffect(() => {
    if (listening) {
      document.body.addEventListener<'keydown'>(
        'keydown',
        handleKeydown as any
      );

      return () => {
        document.body.removeEventListener<'keydown'>(
          'keydown',
          handleKeydown as any,
          false
        );
      };
    }

    document.body.removeEventListener<'keydown'>(
      'keydown',
      handleKeydown as any,
      false
    );
    return () => {};
  }, [listening, targetKeyCode, onKeydown, handleKeydown]);

  return null;
};

export { useKeydown };
