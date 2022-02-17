import { Photo } from "../../../../public/svgs"
import IconButton from "../../../share/form/IconButton"
import FileSelector from "../../../share/form/FileSelector"

interface props {
  setFileURL: Function
}

export default function AvatarSelector({ setFileURL }:props) {
  return (
    <div>
      <FileSelector 
        Display = { () => <IconButton Icon = { Photo }/> }
        setFileURL = { setFileURL } 
        setFile = { () => {} }
        setFileSuffix = { () => {}}
        accept="image/x-png, image/jpeg, image/svg+xml"
      />
    </div>
  )
}