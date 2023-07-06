import { type FC, type ChangeEvent, type ForwardedRef, type KeyboardEvent } from 'react';

import { TextField } from '@shared/ui/textField';
import useDebounce from '@shared/lib/hooks/useDebounce/useDebounce';
import { Loader } from '@shared/ui/loaders/loader';

import './searchInput.scss';

export interface ISearchInputProps<T> {
    searchFunction: (value: string) => T
    loading?: boolean
    inputRef?: ForwardedRef<HTMLInputElement>
    onKeyDown?: (e: KeyboardEvent) => void
}

const SearchInput: FC<ISearchInputProps<void>> = ({ searchFunction, loading, inputRef, onKeyDown }) => {
    const debounceSearch = useDebounce(searchFunction, 1000);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { target } = e;
        debounceSearch(target.value);
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
            />
            {loading && <Loader />}
        </div>
    );
};

export default SearchInput;
