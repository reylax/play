import { useReducer } from "react"
import Menu from "./menu/Menu"

interface props {
  username: string
  introduce: string
  avatar: string
}

export default function UserInfo({username, introduce, avatar}:props) {
  const [showMenus, menusToggle] = useReducer(prev => !prev, false)
  return (
    <div className="flex flex-col items-center justify-between">
      <section className="flex hover:cursor-pointer items-center  justify-center pl-1 pr-1"
        onClick={menusToggle}
      >
        <img className="w-9 h-9 rounded-full"
          src={ avatar || "/defaultavatar.png" }
          alt="avatar"
        />
        <div className='overflow-hidden pl-2 pr-1'>
          <p className="font-sans font-medium overflow-ellipsis">
            { username }
          </p>
          <p className="break-words overflow-clip overflow-hidden h-5 text-xs">
            { introduce || "every day is a new day" }
          </p>
        </div>
      </section>
      <div className="absolute bottom-14 w-44"
          style={{
            display: showMenus ? "block" : "none",
          }}
        >
        <Menu />
      </div>
    </div>
  )
}


