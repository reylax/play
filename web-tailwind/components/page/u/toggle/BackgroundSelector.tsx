import SvgButton from "../../../share/form/IconButton"
import FileSelector from "../../../share/form/FileSelector"
import { Photo, Close } from "../../../../public/svgs"

interface props {
  setFileURL: Function
}

export default function BackgroundSelector({ setFileURL }:props) {
  return (
    <div className="flex space-x-10">
      <FileSelector 
        Display = { () => <SvgButton Icon = { Photo }/> }
        setFileURL = { setFileURL }
        setFile = { () => {} }
        setFileSuffix = { () => {}}
        accept="image/x-png, image/jpeg, image/svg+xml"
      />

      <SvgButton 
        Icon = { Close }
      />
    </div>
  )
}