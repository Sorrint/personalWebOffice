import { useEffect } from 'react';
export function useClickOutside (ref: HTMLElement, func: () => void) {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function handleClickOutside (e: any) {
            if (!ref.contains(e.target)) {
                func();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, func]);
}
