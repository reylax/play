import { useTheme } from '../../../contexts/themeContext'


interface prop {
  text: string
  index: number
  active: boolean
  setActiveIndex: Function
} 

export default function LangOption({ text, index, active, setActiveIndex } : prop) {

  const { Lang, changeLanguage } = useTheme()
  const handleClick = () => {
    setActiveIndex(index)
    changeLanguage(text)
  }

  
  const color = active ? "text-primary-500 font-semibold" : ""

  return (
    <div className="flex-1 hover:cursor-pointer hover:scale-105"
      onClick={() => handleClick()}
    >      
      <p className={`text-center ${color}`} >{ Lang.display[text] }</p>
    </div>
  )
}

