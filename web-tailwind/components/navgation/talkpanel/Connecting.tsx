import { useEffect, useState } from 'react'
import ToggleButton from './ToggleButton'

interface props {
  timeOut: Function
}

export default function Connecting({timeOut}:props) {
  const [timeOutLeft, setTimeOutLeft] = useState(15)
  
  useEffect(() => {
    const id = setInterval(() => setTimeOutLeft(prev => prev-1), 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (timeOutLeft < -2) {
      timeOut()
    }
  }, [timeOutLeft])
  
  return (
    <div className="w-full space-y-8">
      <ToggleButton 
        onClick={() => {}}
        message={"Connecting.."}
      />
      <div className='flex justify-between px-1 bg-yellow-50 py-2 border-2 border-green-400 rounded-xl'>
        <div className='relative w-16 h-16'> 
          <img className="absolute z-10 w-16 h-16 rounded-lg" src="/sample.jpeg" alt="test" />
          <div className='w-3.5 h-1 absolute top-1/2 left-1/2 animate-connecting'></div>
        </div>
        <div className='relative w-16 h-16'>
          <img className="absolute z-10 w-16 h-16 rounded-sm" src="/defaultAvatar.png" alt="test" />
        </div>
      </div>
      <div className='w-full text-center'>
        <p className='text-3xl'>{timeOutLeft >= 0 ? timeOutLeft : 0}</p>
      </div>
    </div>
  )
}