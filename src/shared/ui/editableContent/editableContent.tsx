import ContentEditable from 'react-contenteditable';
import DOMPurify from 'dompurify';
import { useCallback, useState } from 'react';
import './editableContent.scss';

export const EditableContent = () => {
    const [content, setContent] = useState('');

    const onContentChange = useCallback((evt: any) => {
        const checked = DOMPurify.sanitize(evt.currentTarget.innerHTML);
        setContent(checked);
    }, []);

    return (
        <ContentEditable
            onChange={onContentChange}
            onBlur={onContentChange}
            html={content} />
    );
};
