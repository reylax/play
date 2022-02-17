import ImageCooper from "../../../share/imageEditor/ImageCooper"
import CardHeader from "../../../share/CardHeader"
import ZoomRatio from "../../../share/imageEditor/menus/ZoomRatio"
import { useState } from "react"

interface props {
  img: string
  save: Function
  back: Function
}

export default function BackgroundEditor({ img, save, back }:props){

  const [zoomRatio, setZoomRatio] = useState(1)

  return (
    <div className="fixed-center bg-bg-default rounded-lg flex flex-col select-none"
      style={{
        width: 650,
        height: 680,
      }}
    >
      <ImageCooper
        Header={ ({ crop }) => 
          <CardHeader 
            title="Editor Media"
            close={false}
            applyText="Apply"
            Back={ () => back() }
            Apply={ () => crop() }
            loading={false}
          />
        }
        img={ img }
        rectStyle={{
          width: 620,
          height: 200,
          borderWidth: 3,
        }}
        save={ save }
        zoomRatio={zoomRatio}
        setZoomRatio={setZoomRatio}
      />
      <ZoomRatio 
        zoomRatio={zoomRatio}
        setZoomRatio={setZoomRatio}
      />
    </div>
  )
}