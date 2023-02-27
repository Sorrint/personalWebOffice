import React, { FC } from 'react';

import TextField from '../../shared/ui/textField/textField';
import useDebounce from '../../shared/lib/hooks/useDebounce/useDebounce';
import Loader from '../../shared/ui/loaders/loader';
import './searchInput.scss';

export interface ISearchInputProps<T> {
    searchFunction: (value: string) => T;
    loading?: boolean;
}

const SearchInput: FC<ISearchInputProps<void>> = ({ searchFunction, loading }) => {
    const debounceSearch = useDebounce(searchFunction, 1000);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { target } = e;
        debounceSearch(target.value);
    };

    return (
        <div className="search-field">
            <TextField type={'text'} name={'searchText'} onChange={handleChange} label={'Поиск'} />
            {loading && <Loader />}
        </div>
    );
};

export default SearchInput;
