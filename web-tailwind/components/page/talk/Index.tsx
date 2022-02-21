import { useEffect, useState, useRef } from "react";
import  Gift  from './Gifts';
import { gql, useQuery } from '@apollo/client';
import gifts from '../../../contexts/gifts'


const GET_VIDEO = gql`
  query ($videoId: String!) {
    getVideo(videoId: $videoId) {
      id,
      content,
      subtitles,
    }
  }
`

interface props {
  videoId: string | string []
  targetId: string | string []
}

export default function Talk({videoId, targetId}:props) {

  const {data} = useQuery(GET_VIDEO, {
    fetchPolicy: "network-only",
    variables: {
      videoId,
    },
    onError: console.error
  })

  const [subtitles, setSubtitles] = useState("")

  const videoRef = useRef(null)

  useEffect(() => {
    fetch("/subtitles.txt")
    .then(response => response.text())
    .then(text => setSubtitles(text))
  }, [])

  useEffect(() => {
    let videoElement = videoRef.current
    videoElement?.load()
  }, [data])


  return (
    <div className="flex flex-col justify-between"
      style={{
        height: "calc(100vh - 51px)"
      }}
    >
      <section className="py-3.5 px-4">
        <video ref={videoRef}  controls controlsList="nodownload" className="rounded-xl w-full">
          <source src={data?.getVideo?.content} type="video/mp4"  />
        </video>
      </section>
      <section className="flex-1 border-b border-t border-primary-50">
        <textarea readOnly value={subtitles} className="w-full h-full outline-none scrollbar-hide text-xl p-4 pl-8"
          onWheel={e => e.stopPropagation()}
        >
        </textarea>
      </section>
      <section className="h-14 flex items-center justify-center">
        {
          gifts.map(({id, imageUrl}) => 
          <Gift
            key={id}
            giftId={id}
            imageUrl={imageUrl}
            targetId={targetId}
          />)
        }
      </section>
    </div>
  )
}