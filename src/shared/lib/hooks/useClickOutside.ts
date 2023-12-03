import { useEffect } from 'react';

export function useClickOutside (ref: HTMLElement, func: () => void) {
    useEffect(() => {
        function handleClickOutside (e: MouseEvent) {
            if (!ref.contains(e.target as Node)) {
                func();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, func]);
}
