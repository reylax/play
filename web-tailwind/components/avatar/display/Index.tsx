import CardHeader from "../../share/CardHeader"
import Language from "./Language"
import FontSize from "./FontSize"
import Color from "./Color"
import Background from "./Background"
import { useTheme } from "../../../contexts/themeContext"

export default function Display({ setShowDisplay }:{ setShowDisplay: Function }) {

  const { Lang } = useTheme()

  return (
    <div className="px-3 py-4 space-y-8 rounded-2xl shadow-lg bg-bg-default">
      <CardHeader 
        loading={false}
        close={false}
        applyText={ Lang.display.apply }
        title={ Lang.display.title }
        Back={ () => setShowDisplay(false) }
        Apply={ () => setShowDisplay(false) }
      />
      <section className="space-y-6 px-5">
        <div>
          <p className="pb-2 text-sm">{ Lang.display.language }</p>
          <div className="bg-b-paper rounded-xl py-4">
            <Language />
          </div>
        </div>
        <div> 
          <p className="pb-2 text-sm">{ Lang.display.fontsize }</p>
          <div className="bg-b-paper rounded-xl py-4 px-3.5">
            <FontSize />
          </div>
        </div>
        <div>
          <p className="pb-2 text-sm">{ Lang.display.color }</p>
          <div className="bg-b-paper rounded-xl py-4 px-5">
            <Color />
          </div>
        </div>
        <div>
          <p className="pb-2 text-sm">{ Lang.display.background }</p>
          <div className="bg-b-paper rounded-xl py-2 px-1">
            <Background />
          </div>
        </div>
      </section>
    </div>
  )
}