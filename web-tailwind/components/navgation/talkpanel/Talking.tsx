import { useEffect, useRef, useState } from "react";
import Idicator from "./ToggleButton";
import gifts from '../../../contexts/gifts'



interface props {
  is_speaking: boolean
  cut: Function
  receivedGiftId: string
}

export default function Talking({is_speaking, cut, receivedGiftId}:props) {

  const border = is_speaking ? "border-green-300" : ""

  const animationBoxRef = useRef(null)

  useEffect(() => {
    if (!receivedGiftId) return
    let animationBox = animationBoxRef.current
    let imgElement = document.createElement("img")
    for (var i=0; i < gifts.length-1; i++) {
      if (gifts[i].id === receivedGiftId) {
        break
      }
    }
    imgElement.src = gifts[i].imageUrl
    imgElement.className = 'animate-receive invisible'
    if (animationBox.hasChildNodes()) {
      animationBox.removeChild(animationBox.firstChild)
    }
    animationBox.appendChild(imgElement)

  }, [receivedGiftId])

  return (
    <div className="space-y-8">
      <Idicator 
        onClick={cut}
        message={"Take it's Easy"}
      />
      <div className="relative w-32 m-auto">
        <img className={`${border} rounded-full border-2 border-b`} src="/defaultavatar.png" alt="another side" />
        <div className="fixed-center w-5 h-5" ref={animationBoxRef} >
        </div>
      </div>
    </div>
  )
}