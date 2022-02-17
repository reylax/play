import { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut } from "../../../../public/svgs"


interface props {
  zoomRatio: number
  setZoomRatio: Function
}

export default function ZoomRatio({zoomRatio, setZoomRatio}:props) {
  const [ratioBarWidth, setRatioBar] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [mousePosition, setMousePosition] = useState(0)

  const ratioBarRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (event:any) => {
    setDragging(true)
    setMousePosition(event.pageX) 
  }
  
  const handleMouseUp = () => setDragging(false)

  const handleMouseMove = (event:any) => {
    if (! dragging) return
    const dx = event.pageX - mousePosition
    console.log(mousePosition)
    setZoomRatio(prev => Math.max(1, Math.min(2, prev + dx / ratioBarWidth)))
    setMousePosition(event.pageX)
  }

  const handleClick = (event:any) => {
    const ratioBar = ratioBarRef.current
    if (!ratioBar) return 
    const {x, width} = ratioBar.getBoundingClientRect()
    const cx = event.pageX
    var dotPosition = cx - x
    setZoomRatio(1 + dotPosition/width)
  }

  useEffect(() => {
    const ratioBar = ratioBarRef.current
    const {width} = ratioBar.getBoundingClientRect()
    setRatioBar(width)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [dragging, mousePosition])


  return (
      <div className="flex items-center justify-center space-x-2 py-2">
        <div className="w-4">
          <ZoomOut />
        </div>
        <div className="py-2 w-3/5 cursor-pointer relative"
          onClick={ handleClick }
        >
          <main className="relative bg-primary-100 h-1 rounded-md"
            ref={ ratioBarRef }
          >
            <div className="absolute w-4 h-4 rounded-full bg-primary-500"
              onMouseDown={ handleMouseDown }
              style={{
                top: -6,
                left: (zoomRatio - 1) * (ratioBarWidth - 16)
              }}
            >
              {/* dot */}
            </div>
          </main>
          <div className="absolute h-1 w-0 bg-primary-500 left-0 rounded-md"
            style={{
              width: (zoomRatio - 1) * (ratioBarWidth - 12),
              top: "50%",
              transform: "translate(0, -50%)"
            }}
          >
            {/* musk */}
          </div>
        </div>
        <div className="w-4">
          <ZoomIn />
        </div>
      </div>
  )
}