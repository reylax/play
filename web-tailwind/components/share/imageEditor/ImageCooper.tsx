import { useEffect, useState, useRef } from "react"

interface props {
  Header: any
  img: string
  rectStyle: any
  save: Function
  zoomRatio: number
  setZoomRatio: Function
}

export default function ImageCooper({ img, rectStyle, save, Header, zoomRatio, setZoomRatio}: props) {
  // clip rect [x, y, right, bottom]
  const [rectPosition, setRectPosition] = useState([0, 0, 0, 0])
  const rectRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  // handle image zoom in 
  const [imgOriginSize, setImgOriginSize] = useState([0, 0])

  const zoom = (event:any) => {
    const image = imgRef.current
    if (!image) return
    const factor = event.deltaY < 0 ? 1.02 : 1/1.02
    if (factor < 1 && zoomRatio > 1) {
      const [cx, cy, cRight, cBottom] = rectPosition
      const {x, y, right, bottom, width, height} = image.getBoundingClientRect()
      let dx = (width - width * factor) / 2
      let dy = (height - height * factor) / 2
      var mx = 0, my = 0
      // lower than topleft corner
      if (x+dx > cx) mx = -(x+dx-cx)
      if (y+dy > cy) my = -(y+dy-cy) 
      // higher than rightBottom corner
      if (right-dx < cRight) mx = cRight-(right-dx)
      if (bottom-dy < cBottom) my = cBottom-(bottom-dy)
      setImagePosition(([tx, ty]) => [tx+mx, ty+my]) 
    }
    var newRatio = image.clientWidth * factor / imgOriginSize[0]
    newRatio = Math.min(Math.max(1, newRatio), 2)
    setZoomRatio(newRatio)
  }

  useEffect(() => {
    const image = imgRef.current
    if (!image || zoomRatio==1) return
    var dx = 0, dy =0
    const [cx, cy, cRight, cBottom] = rectPosition
    const {x, y, right, bottom} = image.getBoundingClientRect()
    if (x > cx) dx = cx-x 
    if (y > cy) dy = cy-y
    if (right < cRight) dx = cRight-right
    if (bottom < cBottom) dy = cBottom-bottom
    setImagePosition(([tx, ty]) => [tx+dx, ty+dy])
  }, [zoomRatio])

  // handle image move
  const [imagePosition, setImagePosition] = useState([0, 0])
  const [dragging, setDragging] = useState(false)
  const [mousePosition, setMousePosition] = useState([0, 0])
  const handleMouseDown = (event:any)  => {
    if (event.button == 0) {
      setDragging(true)
      setMousePosition([event.pageX, event.pageY])
    }
  }
  const handleMouseUp = () => setDragging(false)
  const handleMouseMove = (event:any)  => {
    if (!dragging) return
    const image = imgRef.current
    if (!image) return
    const [prevx, prevy] = mousePosition
    const curx = event.pageX
    const cury = event.pageY
    var dx = curx - prevx
    var dy = cury - prevy
    var [x, y] = isInRectBoundary(image, dx, dy)
    setImagePosition(([px, py]) => [px+x, py+y])
    setMousePosition([curx, cury])
  }

  const isInRectBoundary = (image:HTMLImageElement, dx:number, dy:number):number[] => {
    const [cx, cy, cRight, cBottom] = rectPosition
    const {x, y, right, bottom} = image.getBoundingClientRect()
    const nx = dx > 0
                  ? dx+x < cx ? dx : cx-x
                  : right+dx > cRight ? dx : cRight-right
    const ny = dy > 0
                  ? dy+y < cy ? dy : cy-y
                  : bottom+dy > cBottom ? dy : cBottom-bottom
    return [nx, ny]
  }

  const getRectPositionAndImageOriginSize = () => {
    let rect = rectRef.current
    let img = imgRef.current
    if (!rect || !img) return
    let {x, y, right, bottom, width, height} = rect.getBoundingClientRect()
    setRectPosition([x, y, right, bottom])
    // try resize image base on width
    let originWidth = width
    let originHeight = img.naturalHeight * originWidth / img.naturalWidth
    // if adapted height less than rect height, than resize base on height
    if (originHeight < height) {
      originHeight = height
      originWidth = img.naturalWidth * originHeight / img.naturalHeight
    }
    setImgOriginSize([originWidth, originHeight])
  }

  const crop = () =>  {
    const image = imgRef.current
    if (!image) return
    const [cx, cy, cr, cb] = rectPosition
    const {x, y, width, height} = image.getBoundingClientRect()
    const widthRatio = image.naturalWidth / width
    const heightRatio = image.naturalHeight / height
    const dx = (cx - x) * widthRatio 
    const dy = (cy - y) * heightRatio
    const  clipRectWidth = cr - cx
    const clipRectHeight = cb - cy
    const dwidth = clipRectWidth * widthRatio 
    const dheight = clipRectHeight * heightRatio

    const canvas = document.createElement("canvas")
    canvas.width = clipRectWidth
    canvas.height = clipRectHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(image, dx, dy, dwidth, dheight, 0, 0, clipRectWidth, clipRectHeight)
    canvas.toBlob(blob => save(canvas.toDataURL(), blob), 'image/png')
  }

  return (
    <>
      <Header 
        crop={ () => crop() }
      />
      <div className="relative w-full flex items-center justify-center overflow-hidden cursor-move flex-1"
        onMouseMove={ handleMouseMove }
        onWheel={ zoom }
        onMouseDown={ handleMouseDown }
        onMouseUp={ handleMouseUp }
      >
        <section className="absolute top-0 bottom-0 left-0 right-0 flex flex-col z-10">
          <div className="bg-gray-200 flex-1 opacity-60"></div>
          <section className="w-full flex">
            <div className="bg-gray-200 flex-1 opacity-60"></div>
            <main className="border-primary-500"
              style={ rectStyle }
              ref={rectRef}
            >
            </main>
            <div className="bg-gray-200 flex-1 opacity-60"></div>
          </section>
          <div className="bg-gray-200 flex-1 opacity-60"></div>
        </section>
        <img 
          style={{
            maxWidth: "none",
            width: zoomRatio * imgOriginSize[0],
            height: zoomRatio * imgOriginSize[1],
            transform: `translate(${imagePosition[0]}px, ${imagePosition[1]}px)`
          }}
          src={ img } 
          alt="no image selected"
          ref={ imgRef }
          onLoad={getRectPositionAndImageOriginSize} 
        />
      </div>
    </>
  )
}

