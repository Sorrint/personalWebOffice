import { useState, FocusEvent } from 'react';
import { useForm } from 'react-hook-form';
import './editableSpan.scss';

const EditableSpan = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { register } = useForm();
    const [text, setText] = useState('Click to edit');

    const handleSave = (e: FocusEvent<HTMLSpanElement>) => {
        // предотвращаем перезагрузку страницы при нажатии Enter
        e.preventDefault();
        const trimmedText = e.currentTarget.innerText.trim();
        console.log('trimmedText !== пусто', trimmedText !== '');
        if (trimmedText !== '') setText(() => trimmedText);
        if (trimmedText === '') setText(() => 'Click to edit');
        setIsEditing(false);
    };

    return (
        <span
            contentEditable={isEditing}
            onBlur={(e) => handleSave(e)}
            onClick={() => setIsEditing(true)}
            className="editableSpan"
            suppressContentEditableWarning
        >
            {text}
        </span>
    );
};

export default EditableSpan;
