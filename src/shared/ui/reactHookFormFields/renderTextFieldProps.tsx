import { TextField } from '../../ui/textField';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface renderTextFieldProps<T extends FieldValues> {
    fieldName: Path<T>
    register: UseFormRegister<T>
    textFieldType: 'number' | 'text'
}

export const renderRHFTextField = <T extends FieldValues>(props: renderTextFieldProps<T>) => {
    const {fieldName, register, textFieldType} = props;
    return  <TextField 
        {...register(fieldName, { valueAsNumber: textFieldType==='number'})}
        className= {`editCard__cell editItem__${fieldName}`} 
        type={textFieldType}
    />;
};