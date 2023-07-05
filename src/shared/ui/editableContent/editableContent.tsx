import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import { useCallback, useState } from "react";
import './editableContent.scss'

export const EditableContent = () => {
	const [content, setContent] = useState("")

	const onContentChange = useCallback((evt: any) => {
		const sanitizeConf = {
			allowedTags: ["b", "i", "a", "p"],
			allowedAttributes: { a: ["href"] }
		};

		setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf))
	}, [])

	return (
		<ContentEditable
			onChange={onContentChange}
			onBlur={onContentChange}
			html={content} />
	)
}
