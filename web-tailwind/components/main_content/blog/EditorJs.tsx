import { createReactEditorJS } from 'react-editor-js'
import List from '@editorjs/list'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import ImageTool from '@editorjs/image'
import Embed from '@editorjs/embed'


interface props {
  data: string
}

export default function EditorJs({data}) {
  const EDITOR_JS_TOOLS = {
    embed: Embed,
    list: List,
    header: Header,
    marker: Marker,
    image: ImageTool 
  }

  const ReactEditorJS = createReactEditorJS()
  return (
    <div className="tracking-widest">
      <ReactEditorJS 
        data={data}
        tools={EDITOR_JS_TOOLS}
        readOnly={true}
      />
    </div>
  )
}