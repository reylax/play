import { ComponentType } from 'react';
import { Checked } from '../../../public/svgs';
import { useTheme } from '../../../contexts/themeContext';


interface props {
  name: string
  color: string
  Icon: ComponentType
}

export default function ColorOption({ color, Icon, name }:props) {

  const { theme: { primary }, changePrimary } = useTheme()

  const Circle = () => 
      <div className="w-11 h-11 rounded-full flex justify-center items-center hover:cursor-pointer"
        onClick={() => changePrimary(name)}
        style={{
          backgroundColor: color,
        }}
        >
          { name === primary && 
            <div className="w-6 h-6 text-white">
              <Checked /> 
            </div>
          }
      </div>  
  return (
    <div className="flex justify-center items-center flex-col">
      <Circle />
      <div className="w-6 h-6 mt-2">
        <Icon />
      </div>
    </div>
  )
}
