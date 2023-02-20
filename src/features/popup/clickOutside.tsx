import { useCallback, useEffect, FC } from 'react';

function isClickedOutside(clickedElement: any, targetElement: any) {
    let clickedEl = clickedElement;

    while (clickedEl) {
        if (clickedEl === targetElement) {
            return false;
        }

        clickedEl = clickedEl.parentNode;
    }

    return document.contains(clickedElement);
}

interface ClickOutsideProps {
    children: JSX.Element;
    onClickOutside: () => void;
    reference: Node;
}

export const ClickOutside: FC<ClickOutsideProps> = ({ children, reference, onClickOutside }) => {
    const handleOutsideClick = useCallback(
        (event: MouseEvent) => {
            if (!reference || !onClickOutside) {
                return;
            }

            if (isClickedOutside(reference, event.target)) {
                onClickOutside();
            }
        },
        [onClickOutside, reference]
    );

    // handle clicks outside the popup
    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [handleOutsideClick]);

    return children;
};
