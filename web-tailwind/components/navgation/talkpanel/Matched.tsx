import { useEffect } from "react"
import Idicator from "./ToggleButton"

interface props {
  accept: Function
  deny: Function
}

export default function Matched({accept, deny}:props) {

  // useEffect(() => {
  //   const id = setTimeout(() => { deny() }, 15000)
  //   return () => {
  //     clearTimeout(id)
  //   }
  // }, [])

  return (
    <div className="space-y-5">
      <Idicator 
        message="Catch One!"
        onClick={() => {}}
      />
      <div className="w-40 border-2 border-green-300 rounded-sm relative">
        <div className="absolute h-2 w-2 rounded-full bg-green-500 animate-matched"
          style={{
            boxShadow: "0px 0px 6px 3px #17D7A0",
            top: "-4px",
            right: "-4px",
          }}
        ></div>
        <div className="w-full">
          <img src="/defaultavatar.png" alt="fjklsf" />
        </div>
        <div className="flex w-full">
          <button className="w-2/5 bg-red-500 active:bg-red-500 hover:bg-red-600"
            onClick={() => deny()}
          >
            拒绝
          </button>
          <button className="flex-1 bg-blue-500 py-1 active:bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => accept()}
          >
            接受
          </button>
        </div>
      </div>
    </div>
  )
}