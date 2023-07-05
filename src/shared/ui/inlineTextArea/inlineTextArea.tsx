import { ForwardedRef, forwardRef, useState } from 'react';
import { FieldValues, Path, useForm } from 'react-hook-form';

interface IInlineTextArea<T extends FieldValues> {
    name: Path<T>;
}

const InlineTextArea = forwardRef(function InlineTextArea<T extends FieldValues>(
    props: IInlineTextArea<T>,
    ref: ForwardedRef<HTMLInputElement>
) {
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" name="text" placeholder="Enter text" ref={ref} />
                    {/* {errors.text && <span>This field is required</span>} */}
                    <button type="submit">Save</button>
                </form>
            ) : (
                <span onClick={() => setIsEditing(true)}>Click to Edit</span>
            )}
        </div>
    );
});

export default InlineTextArea;
