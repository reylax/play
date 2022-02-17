import { ComponentType } from "react"
import { RightArrow } from "../../../public/svgs"

interface props {
  Icon: ComponentType
  text: string
  isExtended: boolean
  onClick: Function
}

export default function MenuEntry({ Icon, text, isExtended, onClick }:props) {
  return (
    <button className="rounded flex items-center w-full hover:cursor-pointer hover:bg-b-active px-2 py-2"
      onClick={ () => onClick() }
    >
      <div className='flex-none w-4 h-4 mr-3 text-gray-500'>
        <Icon />
      </div>
      <p className="flex-1 text-left font-mono text-sm">{ text } </p>
      <div className="w-3 h-3 text-gray-500">
        { isExtended && <RightArrow /> }
      </div>
    </button>
  )
}

