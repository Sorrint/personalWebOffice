import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';
import DOMPurify from 'dompurify';
import { useCallback, useState } from 'react';
import { type FieldValues, type Path, useController } from 'react-hook-form';

import './editableContent.scss';

interface EditableContentProps <T extends FieldValues> {
    name: Path<T>
}

export const EditableContent = <T extends FieldValues>({ name }: EditableContentProps<T>) => {
    const { field } = useController({ name });

    const [, setContent] = useState('');

    const onContentChange = useCallback((evt: ContentEditableEvent) => {
        const checked = DOMPurify.sanitize(evt.currentTarget.innerHTML);
        setContent(checked);
        field.onChange(checked);
    }, []);

    const onContentBlur = useCallback(() => {
        return;
    }, []);


    return (
        <ContentEditable
            onChange={onContentChange}
            onBlur={onContentBlur}
            html={field.value}
        />
    );
};
