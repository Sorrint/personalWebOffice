import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form/dist/types/path';

export type InputProps<T, U> = {
    name: Path<T>;
    type: string;
    inputClass: string;
    onChange: () => U;
};

const TextField: FC<InputProps> = ({ type, inputClass, name, onChange }) => {
    return (
        <>
            <label>Выберите товар</label>
            <input type={type} className={inputClass} onChange={onChange} />
        </>
    );
};

export default TextField;
