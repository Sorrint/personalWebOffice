import ContentEditable from 'react-contenteditable';
import { useCallback, useEffect, useState } from "react";
import './editableContent.scss'

export const EditableContent = () => {
	const [content, setContent] = useState("")

	const onContentChange = useCallback((evt: any) => {
		setContent(evt.currentTarget.innerHTML)
	}, [])

	return (
		<ContentEditable
			onChange={onContentChange}
			onBlur={onContentChange}
			html={content} />
	)
}
