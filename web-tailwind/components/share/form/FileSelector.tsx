import { useRef, ComponentType } from 'react';

interface props {
    Display: ComponentType
    setFileURL: Function
    setFile: Function
    setFileSuffix: Function
    accept: string
}

export default function FileSelector({ Display, setFileURL, setFile, setFileSuffix, accept }:props) {
    const fileChooseRef = useRef<HTMLInputElement>(null)
    function get_file(e:any) {
        const reader = new FileReader()
        let filename = e.target.value
        let imagefile = e.target.files[0]
        if (!filename || !imagefile) return 
        reader.readAsDataURL(imagefile)
        reader.onload = () => setFileURL(reader.result)
        if (setFile) setFile(imagefile)
        if (setFileSuffix) setFileSuffix(get_file_suffix(filename))
    }
    
    return (
        <div onClick={ () => fileChooseRef?.current?.click() }>
            <input onChange={ get_file } ref={ fileChooseRef } hidden type='file' accept={ accept } required/>
            <Display />
        </div>
    )
}

function get_file_suffix (filename) {
  if (filename === '') return 
  let dotPos = filename.lastIndexOf('.')
  if (dotPos === -1) return 
  return filename.substring(dotPos)
}