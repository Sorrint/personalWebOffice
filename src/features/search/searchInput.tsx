import React, { FC } from 'react';

import TextField from '../../shared/ui/textField/textField';
import useDebounce from '../../shared/lib/hooks/useDebounce/useDebounce';

export interface ISearchInputProps<T> {
    searchFunction: (value: string) => T;
}

const SearchInput: FC<ISearchInputProps<void>> = ({ searchFunction }) => {
    const debounceSearch = useDebounce(searchFunction, 1000);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        debounceSearch(target.value);
    };

    return <TextField type={'text'} name={'searchText'} inputClass={'searchField'} onChange={handleChange} />;
};

export default SearchInput;
