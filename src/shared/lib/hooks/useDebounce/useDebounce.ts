import { useCallback, useRef } from 'react';

type CallbackFunc = (...args: any[]) => void;

export default function useDebounce<T extends CallbackFunc> (callback: T, delay: number) {
    const timer = useRef<NodeJS.Timeout | undefined>();

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

// import {useCallback, useRef} from "react";

// export default function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
//     const timer = useRef<NodeJS.Timeout>();

//     const debouncedCallback = useCallback((...args: Parameters<T>) => {
//         if (timer.current) {
//             clearTimeout(timer.current)
//         }
//         timer.current = setTimeout(() => {
//             callback(...args)
//         }, delay)
//     }, [callback, delay])

//     return debouncedCallback;
// };
