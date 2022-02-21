import { useEffect, useState } from "react";
import Idicator from "./ToggleButton";

interface props {
  cancel: Function
}


export default function Matching({cancel}:props) {
  const [timeElips, setTimeElips] = useState(0)

  useEffect(() => {
    setTimeElips(0)
    const eventId = setInterval(() => setTimeElips(prev=>prev+1), 1000)
    return () => clearInterval(eventId)
  }, [])

  const secondToString = s => {
    var minute = Math.floor(s / 60)
    var second = s % 60
    var res
    if (minute < 10) {
      res = '0' + minute.toString()
    } else {
      res = minute.toString()
    }
    res += ':'
    if (second < 10) {
      res += '0' + second.toString()
    } else {
      res += second.toString()
    }
    return res
  }

  return (
    <Idicator 
      message={secondToString(timeElips)}
      onClick={cancel}
    />
  )
}

