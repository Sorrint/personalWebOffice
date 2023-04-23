import { MutableRefObject, KeyboardEvent } from 'react';

//функция для перемещения по списку с помощью клавиатуры, а также выбора элемента, находящегося в фокусе.

const handleListKeydownEvent =
    (refsArray: (HTMLElement | null)[], parentRef?: MutableRefObject<HTMLElement | null>) =>
    (event: KeyboardEvent, onSubmit: (...args: any[]) => void) => {
        const currentFocusIndex = refsArray.indexOf(event.target as HTMLElement);
        const nextElement = refsArray[currentFocusIndex + 1];
        const prevElement = refsArray[currentFocusIndex - 1];
        if (event.code === 'ArrowDown') {
            nextElement && nextElement !== refsArray[0] && nextElement.focus();
        }
        if (event.code === 'ArrowUp') {
            prevElement ? prevElement.focus() : parentRef?.current?.focus();
        }
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            event.preventDefault();
            onSubmit();
        }
    };

export default handleListKeydownEvent;
