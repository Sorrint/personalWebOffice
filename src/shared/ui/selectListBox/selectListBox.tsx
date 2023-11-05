import { type ReactNode, Fragment, useMemo, memo } from 'react';
import { Listbox } from '@headlessui/react';
import styles from './selectListBox.module.scss';
import { Button } from '../button';
import classNames from 'classnames';

export interface ListBoxItem {
    _id: string | number
    content: ReactNode
    disabled?: boolean
}

interface SelectListBoxProps<T extends string> {
    options?: ListBoxItem[]
    onChange?: (selected: T) => void
    defaultValue?: string
    value?: T
}

export const SelectListBox = memo(<T extends string> (props: SelectListBoxProps<T>) => {
    const { options, onChange, defaultValue, value } = props;
    
    const selectedItem = useMemo(() => {
        return options?.find((option) => option._id === value);
    }, [options, value]);

    const getItemStyles = (active: boolean, selected: boolean) => classNames(styles.option, {
        [styles.active]: active,
        [styles.selected]: selected    
    })

    return (
        <Listbox 
            onChange={onChange} 
            as='div' 
            value={value} 
            className={styles['select-list']}
        >  
            <Listbox.Button 
                as={Button} 
                buttonType='dropdown' 
            >
                {selectedItem?.content ?? defaultValue}
            </Listbox.Button>
            <Listbox.Options 
                className={styles.options}
            >
                {options?.map((option) => (
                    <Listbox.Option 
                        key={option._id} 
                        value={option._id} 
                        as={Fragment} 
                    >
                        {({ active, selected }) => (
                            <li
                                className={getItemStyles(active, selected)}
                            >
                                {option.content}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
});
