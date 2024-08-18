import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

interface MarkdownEditorProps {
    initialContent?: string; // Markdown content
    onChange: (markdown: string) => void; // Callback for handling content change
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ initialContent = '', onChange }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        if (initialContent) {
            const contentState = markdownToDraft(initialContent);
            const initialEditorState = EditorState.createWithContent(convertFromRaw(contentState));
            setEditorState(initialEditorState);
        }
    }, [initialContent]);

    const handleEditorChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        const markdown = draftToMarkdown(convertToRaw(newEditorState.getCurrentContent()));
        onChange(markdown);
    };

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link'],
                inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
            }}
        />
    );
};

export default MarkdownEditor;
