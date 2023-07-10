import ContentEditable from 'react-contenteditable';
import DOMPurify from 'dompurify';
import { type FC, useCallback, useState } from 'react';
import './editableContent.scss';
import { type FieldValues, type Path, useController } from 'react-hook-form';

interface IEditableContent <T extends FieldValues> {
    name: Path<T>
}

export const EditableContent: FC<IEditableContent<any>> = ({ name }) => {
    const { field } = useController({ name });

    const [, setContent] = useState('');

    const onContentChange = useCallback((evt: any) => {
        const checked = DOMPurify.sanitize(evt.currentTarget.innerHTML);
        setContent(checked);
        field.onChange(checked);
    }, []);

    return (
        <ContentEditable
            onChange={onContentChange}
            onBlur={onContentChange}
            html={field.value}
        />
    );
};
