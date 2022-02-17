import { Checked } from "../../../public/svgs"
import { useTheme } from "../../../contexts/themeContext"


const commonStyle = "border-2 flex-1 h-16 mx-1 flex items-center justify-center hover:cursor-pointer rounded"
const checkStyle = "rounded-full p-px w-5 h-5 border-2 text-white"

export default function Background() {
  const { theme: { background }, changeBackground, changeMode, Lang } = useTheme()

  const light = background === "default"
  const dim = background === "dim"
  const night = background === "night"

  return (
    <div className="flex">
      <section className={`${commonStyle} bg-white  
                           ${light ? "border-primary-500" : "border-white"}`}
        onClick={() => { changeBackground('default'); changeMode('light') }}
      >
        <div className={`${checkStyle}
                         ${light ? "bg-primary-500 border-primary-500" : "bg-white border-gray-300"}`}
        >
          { light && <Checked /> }               
        </div>
        <p className="mx-8 text-black font-medium">{ Lang.display.default }</p>
      </section>

      <section className={`${commonStyle} bg-gray-800
                           ${dim ? "border-primary-500" : "border-gray-800"}`}
        onClick={() => {changeBackground('dim'); changeMode('dark')}}
      >
        <div className={`${checkStyle}
                         ${dim ? "bg-primary-500 border-primary-500" : "bg-gray-800 border-gray-100"}`}>
          { dim && <Checked /> }              
        </div>
        <p className="mx-8 text-white font-medium">{ Lang.display.dim }</p>
      </section>

      <section className={`${commonStyle} bg-black 
                           ${night ? "border-primary-500" : "border-black"}`}
        onClick={() => { changeBackground('night'); changeMode('dark') }}
      >
        <div className={`${checkStyle}
                          ${night ? "bg-primary-500 border-primary-500" : "bg-black border-gray-100"}`}>
          { night && <Checked /> }
        </div>
        <p className="mx-8 text-white font-medium">{ Lang.display.night }</p>
      </section>
    </div>
  )
}
