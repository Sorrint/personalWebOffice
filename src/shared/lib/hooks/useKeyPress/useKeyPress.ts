import { useEffect, useState } from 'react';

export const useKeyPress = (keyTarget: string) => {
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const downHandler = ({ key }: KeyboardEvent) => {
        if (key === keyTarget) setIsKeyPressed(true);
    };

    const upHandler = ({ key }: KeyboardEvent) => {
        if (key === keyTarget) setIsKeyPressed(true);
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
    }, []);
    return { isKeyPressed, setIsKeyPressed };
};
