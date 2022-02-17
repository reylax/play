import { COMMENT } from "../../../../public/svgs";

interface props {
  numOfcomments: number,
  toggle: Function,
  size: string
}

export default function AddComment({ numOfcomments, size, toggle }:props) {
  return (
    <div className="flex items-center group hover:text-green-500 cursor-pointer group">
      <div className={`${size} p-1.5 rounded-full mr-1 group-hover:bg-blue-100`}
        onClick={event => {
          toggle()
          event.stopPropagation()
        }}
      >
        <COMMENT />
      </div>
      { numOfcomments > 0 &&
        <p className="text-c-hint group-hover:text-green-500">{numOfcomments}</p>
      }
    </div>

  )
}