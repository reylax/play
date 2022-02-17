import {useState} from 'react';
import LangOption from './LangOption';


const options = ["english", "chinese"]

export default function Language() {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  return (   
    <div className="flex rounded-lg">
      {options.map((text, index) => 
        <LangOption
          key={index} 
          text={text}
          index={index}
          active={index===activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </div>
  )
}

