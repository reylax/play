import { useEffect, useRef, useState } from "react";
import Idicator from "./ToggleButton";
import Mathing from "./Matching"
import Talking from "./Talking"
import Matched from './Matched'
import Connecting from "./Connecting";
import { useTheme } from '../../../contexts/themeContext'
import { useRouter } from 'next/router';


interface props {
  callerStream: any
  remoteStream: any
  streamCall: Function
  cutOffStream: Function
  stopStreamTrack: Function
  videoId: string
}

export default function Mediator({callerStream, videoId, remoteStream, streamCall, cutOffStream, stopStreamTrack}:props) {
  const {user: {_id}, matchSocket, matchSocketSend} = useTheme()
  const [UIstate, setUIstate] = useState("init")
  const [matchAccepted, setMathAccepted] = useState(false)
  const [matchAcceptedBy, setMathAcceptedBy] = useState(false)
  const [targetId, setTargetId] = useState("")
  const [receivedGiftId, setReceiveGift] = useState("")

  const router = useRouter()

  const remoteStreamRef = useRef(null)
  
  useEffect(() => {
    // let caller = callerStreamRef.current
    // caller.srcObject = callerStream
    // if (callerStream) {
    //   caller.play()
    // }
    let remote = remoteStreamRef.current
    remote.srcObject = remoteStream
    if (remoteStream) {
      remote.play()
      router.push(`/talk?videoId=${videoId}&&targetId=${targetId}`)
    }
  }, [remoteStream])

  matchSocket.onmessage = event => {
    const message = JSON.parse(event.data)
    switch (message.purpose) {
      case "match_success":
        console.log("catchSomeOne", message.sender_id)
        setTargetId(message.sender_id)
        setUIstate("matched")
        break;
      case "deny_match":
        console.log("matchCanceledBy", message.sender_id)
        matching()
        break;
      case "accept_match":
        if (matchAcceptedBy) break
        console.log("mathAcceptedBy", message.sender_id)
        setMathAcceptedBy(true)
        if (matchAccepted) {
          setUIstate("conncting")
          streamCall({target_id: targetId})
          console.log(`talk to ${_id} ${message.sender_id}`)
        }
        break
      case "cut_off":
        console.log(`talk cutted by ${message.sender_id}`)
        setMathAccepted(false)
        setMathAcceptedBy(false)
        stopStreamTrack()
        setUIstate("init")  
        break
      case "sent_gift":
        console.log("received a gift!")
        setReceiveGift(message.message)
      default:
        break;
    }
  }

  function matching() {
    if (!_id) {
      alert("please log in")
      return 
    }
    setMathAccepted(false)
    setMathAcceptedBy(false)
    setUIstate("matching")
    matchSocketSend({
      type: "matching",
      sender_id: _id,
    })
  }
  
  const quit_matching = () => {
    setUIstate("init")
    setMathAccepted(false)
    setMathAcceptedBy(false)
    matchSocketSend({
      type: "cancel_matching",
      sender_id: _id,
    })
  }

  const accept_match = targetId => {
    if (!targetId) return
    setMathAccepted(true)
    if (matchAcceptedBy) {
      setUIstate("conncting")
    }
    matchSocketSend({
      type: "ptp",
      purpose: "accept_match",
      sender_id: _id,
      target_id: targetId,
    })
  }

  const deny_match = targetId => {
    setUIstate("init")
    setMathAccepted(false)
    setMathAcceptedBy(false)
    if (targetId) {
      console.log("deny_match:", targetId)
      matchSocketSend({
        type: "ptp",
        purpose: "deny_match",
        sender_id: _id,
        target_id: targetId,
      })
    }
  }

  const cut_off = targetId => {
    setUIstate("init")
    stopStreamTrack()
    if (targetId) {
      matchSocketSend({
        type: "ptp",
        purpose: "cut_off",
        sender_id: _id,
        target_id: targetId,
      })
    }
  }

  const timeOut = () => {
    matching()
  }

  var component
  switch (UIstate) {
    case "init":
      component=
        <Idicator 
          onClick={() => matching()}
          message="Talk"
        />
      break
    case "matching":
      component =
        <Mathing 
          cancel={quit_matching}
        />
      break
    case "matched":
      component=
        <Matched 
          accept={() => accept_match(targetId)}
          deny={() => deny_match(targetId)}
        />
      break
    case "conncting":
      component=
        <Connecting 
          timeOut={timeOut}
        />
      break
    case "talking":
      component=
        <Talking 
          receivedGiftId={receivedGiftId}
          is_speaking={true}
          cut={() => {
            cut_off(targetId)
            cutOffStream()
          }}
        />
      break
    default:
      ;
  }


  return (
    <div className="w-40">
      { component }
      <video ref={remoteStreamRef} className='w-full mt-5'>
      </video>
    </div>
  )
}