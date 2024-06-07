import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { EditorProps as DraftEditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './wysiwyg-editor.css'

const Editor = dynamic<DraftEditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false })

export function WysiwygEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())

    return (
        <Editor
            editorState={editorState}
            toolbarClassName="wysiwyg-toolbar"
            wrapperClassName="wysiwyg-wrapper"
            editorClassName="wysiwyg-editor"
            onEditorStateChange={setEditorState}
            placeholder={"Description de l'événement"}
        />
    )
}
