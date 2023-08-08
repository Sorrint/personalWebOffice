import { memo, type ChangeEvent, type ForwardedRef, type KeyboardEvent, type FocusEvent } from 'react';

import { TextField } from '@shared/ui/textField';
import useDebounce from '@shared/lib/hooks/useDebounce/useDebounce';
import { Loader } from '@shared/ui/loaders/loader';

import './searchInput.scss';

export interface SearchInputProps<T> {
    searchFunction: (value: string) => T
    loading?: boolean
    inputRef?: ForwardedRef<HTMLInputElement | null>
    onKeyDown?: (e: KeyboardEvent) => void
}

export const SearchInput = memo(({ searchFunction, loading, inputRef, onKeyDown }: SearchInputProps<void>) => {
    const debounceSearch = useDebounce(searchFunction, 1000);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { target } = e;
        debounceSearch(target.value);
    };
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <div className="search-field">
            <TextField
                type={'text'}
                name={'searchText'}
                onChange={handleChange}
                label={'Поиск'}
                ref={inputRef}
                onKeyDown={onKeyDown}
                variant='standard'
                onFocus={handleFocus}
            />
            {loading && <div className='search-icon'><Loader /></div>}
        </div>
    );
});
