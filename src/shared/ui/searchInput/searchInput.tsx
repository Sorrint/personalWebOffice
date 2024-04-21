import {
  memo,
  type ChangeEvent,
  type KeyboardEvent,
  type FocusEvent,
  type ReactNode,
  useState,
  useEffect,
  type RefObject,
} from 'react';

import { TextField } from '../../ui/textField';
import useDebounce from '../../lib/hooks/useDebounce/useDebounce';
import { Loader } from '../../ui/loaders/loader';

import styles from './searchInput.module.scss';
import { DropdownList } from '../dropdownList';
import { Popover } from '../popover';

export interface SearchInputProps<T> {
  searchFunction: (value: string) => T;
  loading?: boolean;
  renderList?: () => ReactNode;
  canShowPopover?: boolean;
  showPopover?: boolean;
  setShowPopover?: (show: boolean) => void;
  searchInputRef?: RefObject<HTMLInputElement>;
  firstListElement?: RefObject<HTMLDivElement | null>;
}

export const SearchInput = memo(
  ({
    searchFunction,
    loading,
    renderList,
    canShowPopover,
    showPopover,
    firstListElement,
    searchInputRef,
    setShowPopover,
  }: SearchInputProps<void>) => {
    const [activePopover, setActivePopover] = useState<boolean>(showPopover ?? false);

    useEffect(() => {
      showPopover !== undefined && setActivePopover(showPopover);
    }, [showPopover]);

    useEffect(() => {
      canShowPopover && !activePopover && searchInputRef?.current?.focus();
    }, [activePopover, canShowPopover, searchInputRef]);

    useEffect(() => {
      setShowPopover?.(activePopover);
    }, [activePopover, setShowPopover]);

    const debounceSearch = useDebounce(searchFunction, 1000);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const { target } = e;
      debounceSearch(target.value);
    };
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handleInputKeydown = (key: KeyboardEvent) => {
      if (key.code === 'ArrowDown' && !activePopover) {
        canShowPopover && setActivePopover(true);
      }
      if (key.code === 'ArrowDown' && activePopover && firstListElement?.current) {
        key.preventDefault();
        firstListElement.current.focus();
      }
      if (key.code === 'ArrowUp' && activePopover) {
        key.preventDefault();
        setActivePopover(false);
      }
    };

    const hidePopover = () => {
      setActivePopover(false);
    };

    return (
      <>
        <div className={styles['search-field']}>
          <TextField
            type={'text'}
            name={'searchText'}
            onChange={handleChange}
            label={'Поиск'}
            ref={searchInputRef}
            onKeyDown={handleInputKeydown}
            variant='standard'
            onFocus={handleFocus}
          />
          {loading && (
            <div className={styles['search-icon']}>
              <Loader />
            </div>
          )}
        </div>
        <Popover
          isOpen={activePopover}
          onClose={hidePopover}
          referenceElement={searchInputRef?.current as HTMLElement}
          key={'key'}
        >
          <DropdownList className={styles['dropdown-products']}>{renderList?.()}</DropdownList>
        </Popover>
      </>
    );
  },
);

SearchInput.displayName = 'SearchInput';
