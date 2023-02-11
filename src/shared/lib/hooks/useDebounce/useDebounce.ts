import { useCallback, useRef } from 'react';

export default function useDebounce<T extends Function>(callback: T, delay: number) {
    const timer = useRef<number>();

    const debouncedCallback = useCallback(
        (...args: any) => {
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
