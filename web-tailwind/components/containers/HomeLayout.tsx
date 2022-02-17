import { useEffect, useRef, useState, ComponentType } from 'react';
import Navgation from '../navgation/Navgation';
import BlogCaption from "../../components/main_content/blog/BlogCaption"
import Searchbar from "../searchbar/SearchBar"

interface prop {
    Page: ComponentType
}

interface ViewPort {
    width: number,
    height: number
}

export default function HomeLayout({ Page } : prop) {
    const [viewport, setViewPort] = useState<ViewPort>({
        width: 0,
        height: 0
    })
    const left_bar_ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setViewPort(prev => ({
            ...prev,
            width: window.innerWidth,
            height: window.innerHeight
        }))
        // left bar scroll
        window.addEventListener("wheel", event => {
            const dy = (event.deltaY) * 2
            const left_bar = left_bar_ref.current
            if (!left_bar) return
            left_bar.scrollTo(0, left_bar.scrollTop+dy)
        })
         // resize
        window.addEventListener('resize', () => {
            setViewPort(prev => ({
                ...prev,
                width: window.innerWidth,
                height: window.innerHeight
            }))
        })
    }, [])


    const isPc = viewport.width > 1340
    const isIpad = viewport.width > 1000
    const isPhone = viewport.width <= 1000

    var leftWidth, mainWidth, rightWidth
    if (isPc) {
        leftWidth = 400 
        mainWidth = 620
        rightWidth = 280
    } else if (isIpad) {
        leftWidth = 300 
        mainWidth = 480
        rightWidth = 230
    } else if (isPhone) {
        leftWidth = 0 
        mainWidth = "100%"
        rightWidth = 0
    }


    return (
        <div className='flex justify-center'>
          <section
            style={{width: leftWidth}}
          >
            <div className='fixed h-full overflow-y-auto scrollbar-hide'
                style={{
                    width: leftWidth,
                    scrollBehavior: "smooth",
                }}
                ref={left_bar_ref}
            >            
                <BlogCaption />
            </div> 

          </section>
          <main className="border-l border-r"
                style={{
                width: mainWidth,
            }}
          >
            <section>
                <Searchbar />
            </section>
            <Page />
          </main>
          <section className="overflow-hidden z-10"
                   style={{
                      width: rightWidth,
                    }}
          >
              <div className='fixed'
                    style={{
                            width: rightWidth,
                            height: viewport.height
                }}
              >
                <Navgation />
              </div>
          </section>
        </div>
    )
}

