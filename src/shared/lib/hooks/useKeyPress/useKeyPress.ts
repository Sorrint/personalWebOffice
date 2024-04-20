import { useCallback, useEffect, useState } from 'react';

export const useKeyPress = (keyTarget: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === keyTarget) setIsKeyPressed(true);
    },
    [keyTarget],
  );

  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === keyTarget) setIsKeyPressed(true);
    },
    [keyTarget],
  );
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
  }, [downHandler, upHandler]);
  return { isKeyPressed, setIsKeyPressed };
};
