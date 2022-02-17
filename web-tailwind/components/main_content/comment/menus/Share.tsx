import { SHARE } from "../../../../public/svgs"

interface props {
  size: string
}


export default function Share({size}:props) {
  return (
    <div className="flex items-center group hover:text-green-500 cursor-pointer group">
      <div className={`${size} p-1.5 rounded-full  group-hover:bg-blue-100`}>
        <SHARE />
      </div>
  </div>
  )
}