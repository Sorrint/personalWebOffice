import { type ReactNode, Fragment, useMemo, memo } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import styles from './SelectListBox.module.scss';
import { Button } from '../Button';
import classNames from 'classnames';

export interface ListBoxItem {
  id: string;
  content: ReactNode;
  disabled?: boolean;
}

interface SelectListBoxProps<T extends string> {
  options?: ListBoxItem[];
  onChange?: (selected: T) => void;
  defaultValue?: string;
  value?: T;
}

export const SelectListBox = memo(
  <T extends string>({ options, onChange, defaultValue, value }: SelectListBoxProps<T>) => {
    const selectedItem = useMemo(() => {
      return options?.find(option => option.id === value);
    }, [options, value]);

    const getItemStyles = (active: boolean, selected: boolean) =>
      classNames(styles.option, {
        [styles.active]: active,
        [styles.selected]: selected,
      });

    return (
      <Listbox onChange={onChange} as='div' value={value} className={styles['select-list']}>
        <ListboxButton as={Button} buttonType='dropdown'>
          {selectedItem?.content ?? defaultValue}
        </ListboxButton>
        <ListboxOptions className={styles.options}>
          {options?.map(option => (
            <ListboxOption key={option.id} value={option.id} as={Fragment}>
              {({ active, selected }: { active: boolean; selected: boolean }) => (
                <li className={getItemStyles(active, selected)}>{option.content}</li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    );
  },
);

SelectListBox.displayName = 'SelectListBox';
