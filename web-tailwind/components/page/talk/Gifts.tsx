import { useState } from "react";
import { useTheme } from "../../../contexts/themeContext";



interface props {
  imageUrl: string
  giftId: string
  targetId: string | string []
}

export default function Gift({imageUrl, targetId, giftId}:props) {
  const [sent, setSent] = useState(false)
  const animation = sent ? "animate-sent invisible" : ""

  const {matchSocketSend, user: {_id}} = useTheme()

  const sentGift = () => {
    setSent(true)
    matchSocketSend({
      type: "ptp",
      purpose: "sent_gift",
      sender_id: _id,
      target_id: targetId,
      message: giftId
    })
  }

  return (
    <div className="relative">
      <div className={`w-8 h-8 cursor-pointer hover:scale-110 mt-1 ${animation}`}
        onClick={() => sentGift()}
      >
        <img src={imageUrl} alt="gif, giftIdtImg" />
      </div>
    </div>
  )
} 