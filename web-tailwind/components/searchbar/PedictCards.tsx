import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import AticleCaption from "./AticleCaption";
import VideoCaption from "./VideoCaption"

interface props {
  pedicts: any[]
}

export default function PedictCards ({ pedicts }:props) {
  const [pickedTerm, setPickedTerm] = useState(-1)
  const router = useRouter()

  const handleKeydowm = event => {
    // console.log(event.key)
    switch (event.key) {
      case "ArrowUp":
        setPickedTerm(prev => prev > -1 ? prev-1 : prev)
        break
      case "ArrowDown":
        setPickedTerm(prev => prev < pedicts.length-1 ? prev+1 : prev)
        break
      case "Enter":
        if (0 <= pickedTerm && pickedTerm < pedicts.length) {
          const {id, type} = pedicts[pickedTerm].item
          var url
          switch (type){
            case 'blog':
              url = `/read?blog_id=${id}`           
              break
            case 'video':
              url = `/talk?videoId=${id}`
              break
            default:
              ;
          }
          router.push(url)
        }
        break
      default:
        ;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeydowm)
    return () => {
      document.removeEventListener('keydown', handleKeydowm)
    }
  }, [pedicts, pickedTerm])

  return (
    <div className="first:rounded-t-lg last:rounded-b-lg">
      {pedicts.map(({item:{title, des, authorName, id, type}}, index) => {
        var term = <div></div>
        switch (type) {
          case 'blog':
            term = <AticleCaption
                      key={index} 
                      title={title}
                      des={des}
                      authorName={authorName}
                      id={id}
                   />
            break
          case "video":
            term = <VideoCaption 
                      key={index} 
                      title={title}
                      des={des}
                      authorName={authorName}
                      id={id}
                   />
            break
          default:
            ;  
          }
          return (
            <div className={`${pickedTerm===index ? "bg-gray-200" : ""} cursor-pointer`}
              onMouseOver={() => setPickedTerm(index)}
            >
              {term}
            </div>
          )
      })}
    </div>
  )
}