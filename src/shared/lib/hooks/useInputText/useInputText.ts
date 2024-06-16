import { useEffect } from 'react';

export const useInputText = (callback: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
};
