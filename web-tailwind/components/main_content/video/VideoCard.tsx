import { gql, useQuery } from "@apollo/client"
import { useEffect, useRef } from "react"
import VideoTitle from './VideoTitle'



interface props {
  videoId: string
}

const GET_VIDEO = gql`
  query ($videoId: String!) {
    getVideo(videoId: $videoId) {
      id,
      title,
      content,
      numberOfpros,
      numberOfreplies,
      authorName,
      authorAvatar,
      createdAt,
    }
  }
`

export default function VideoCard({videoId}:props) {
  const {data} = useQuery(GET_VIDEO, {
    fetchPolicy: "network-only",
    variables: {
      videoId,
    },
    onError: console.error
  })

  const videoRef = useRef(null)

  useEffect(() => {
    let videoElement = videoRef.current
    videoElement?.load()
  }, [data])

  return (
    <div className="border-b relative">
      <div className="cursor-pointer pt-4">
        <section className="mr-12 px-5 py-3">
          <div id="video" className="rounded-xl">
            <video ref={videoRef} controls controlsList="nodownload" className="rounded-xl w-full">
              <source src={data?.getVideo?.content} type="video/mp4"  />
                Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <main id="text" className="flex justify-between items-center">
          <section className="w-full">
            <VideoTitle
              id={data?.getVideo?.id} 
              authorName={data?.getVideo?.authorName}
              authorAvatar={data?.getVideo?.authorAvatar}
              numberOfpros={data?.getVideo?.numberOfpros}
              numberOfreplies={data?.getVideo?.numberOfreplies}
              title={data?.getVideo?.title}
            />
          </section>
        </main>
      </div>
    </div>
  )
}