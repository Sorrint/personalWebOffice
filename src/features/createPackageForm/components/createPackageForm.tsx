import type { IPackage } from "@entities/packages";
import { TextField } from "@mui/material";
import type { Path} from "react-hook-form";
import { useForm } from "react-hook-form";

export const CreatePackageForm = () => {

    const fakePackage: IPackage = {
        id: 'axlfjg123',
        name: 'Ведро пластмассовое 1 л белое',
        collection: '1, 1,5 кг',
        color: 'белое',
        volume: 1000,
        weight: 40
    };

    const {register, setValue, handleSubmit, watch } = useForm<IPackage>({
        defaultValues: fakePackage
    });

    const renderTextFieldProps = (fieldName: Path<IPackage>, textFieldType: 'number' | 'text') => {
        return  <TextField 
            {...register(fieldName, { valueAsNumber: textFieldType==='number'})}
            className= {`editPackageCard__cell editItem__${fieldName}`} type={textFieldType}/>;
    };

    return (
        <div className="editPackageCard">
            Ждем
        </div>
    );
};