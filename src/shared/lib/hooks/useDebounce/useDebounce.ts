import { useCallback, useRef } from 'react';

type CallbackFunc = (...args: any[]) => void;

export default function useDebounce<T extends CallbackFunc> (callback: T, delay: number) {
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>();

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedCallback;
}
