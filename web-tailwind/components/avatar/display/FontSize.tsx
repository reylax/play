import { useState } from 'react';

export default function FontSize() {

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex items-center">
      <p className="text-sm">Aa</p>
      <div className="relative flex-1 h-1 bg-primary-50 mx-3.5 z-20">
        <div className="absolute bg-primary-500 h-1" style={{ width: `${activeIndex * 25}%` }}></div>
          {circles.map(index => 
            <Circle 
              key={index}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex} 
            />)}
      </div>
      <p className="text-lg">Aa</p>
    </div>
  )
}


const circles = [0, 1, 2, 3, 4]

interface props {
  index: number
  activeIndex: number
  setActiveIndex: Function
}

const Circle = ({ index, activeIndex, setActiveIndex }:props) => {
  const active = activeIndex === index
  const radius = active ? 14 : 12
  const bgColor = active ? 'bg-primary-600'
                         : index < activeIndex ? 'bg-primary-400'
                                               : 'bg-primary-100'
  return (
      <div className={`absolute rounded-full hover:cursor-pointer ${bgColor} z-20`}
        onClick={() => setActiveIndex(index)} 
        style={{
          bottom: -4,
          left: `${index * 24.5}%`,
          width: radius,
          height: radius,
        }}
      >
      </div>
  )
}
