import { FC, ChangeEvent, ForwardedRef } from 'react';

import TextField from '../../shared/ui/textField/textField';
import useDebounce from '../../shared/lib/hooks/useDebounce/useDebounce';
import Loader from '../../shared/ui/loaders/loader';
import './searchInput.scss';

export interface ISearchInputProps<T> {
    searchFunction: (value: string) => T;
    loading?: boolean;
    inputRef?: ForwardedRef<HTMLInputElement>;
}

const SearchInput: FC<ISearchInputProps<void>> = ({ searchFunction, loading, inputRef }) => {
    const debounceSearch = useDebounce(searchFunction, 1000);
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { target } = e;
        debounceSearch(target.value);
    };

    return (
        <div className="search-field">
            <TextField type={'text'} name={'searchText'} onChange={handleChange} label={'Поиск'} ref={inputRef} />
            {loading && <Loader />}
        </div>
    );
};

export default SearchInput;
