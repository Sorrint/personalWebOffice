import { type ForwardedRef, forwardRef, useState } from 'react';
import { type FieldValues, type Path, useForm } from 'react-hook-form';

interface IInlineTextArea<T extends FieldValues> {
    name: Path<T>
}

export const InlineTextArea = forwardRef(function InlineTextArea<T extends FieldValues> (
    props: IInlineTextArea<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const [isEditing, setIsEditing] = useState(false);
    const { handleSubmit } = useForm();

    const onSubmit = () => {
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing
                ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="text" placeholder="Enter text" ref={ref} />
                        <button type="submit">Save</button>
                    </form>
                )
                : (
                    <span onClick={() => { setIsEditing(true); }}>Click to Edit</span>
                )}
        </div>
    );
});
