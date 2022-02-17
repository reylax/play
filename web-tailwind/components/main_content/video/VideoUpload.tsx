import { useState } from "react";
import TextInput from "../../share/form/TextInput"
import FileSelector from "../../share/form/FileSelector";
import CardHeader from "../../share/CardHeader";
import IconButton from "../../share/form/IconButton";
import { Close } from "../../../public/svgs";
import { useTheme } from "../../../contexts/themeContext";
import { gql, useMutation } from "@apollo/client";
import useTencentCOS from "../../hooks/tencentYun/useTencentCOS"

const UPLOAD_VIDEO = gql`
  mutation ($metaData: String!) {
    uploadVideo(metaData: $metaData) {
      status,
      message
    }
  }
`

interface props {
  close: Function
}


const getFileName = path => {
  try {
    return path.substring(path.lastIndexOf('/')+1)
  } catch (error) {
    return ""
  }
  
}

export default function FilmUpload({close}:props) {
  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [videoFile, setFile] = useState("")
  const [videoSuffix, setVideoSuffix] = useState("")

  const [thumbnail, setThumbnail] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [thumbnailSuffix, setThumbnailSuffix] = useState("")
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [uploadFeedback, setFeedback] = useState("")
  
  const [uploading, setUploading] = useState(false)

  const { user: {username, _id, avatar} } = useTheme()
  const { error, upLoadingRate, postFileToTencentYun} = useTencentCOS()

  // title, content, thumbnail, authorId, authorName, authorAvatar
  const [uploadVideo, { loading }] = useMutation(UPLOAD_VIDEO, {
    onCompleted: response => {
      setFeedback(response.uploadVdieo.message)
    },
    onError: error => {
      setFeedback(error.message)
      console.log(error.message)
    }
  })

  const upload = async () => {
    if (!title) { 
      setFeedback("title can't be empty!")
    } else if (!videoUrl){
       setFeedback("video can't be empty!")
    } else {
      setUploading(true)
      let videoFileName = await postFileToTencentYun({file: videoFile, purpose: "videoUpload", fileExtention: videoSuffix})
      let thumbnailFileName
      if (thumbnail) {
        thumbnailFileName = await postFileToTencentYun({file: thumbnail, purpose: "videoThumbnail", fileExtention: thumbnailSuffix})
      }
      let video = {
        title: title,
        content: getFileName(videoFileName),
        thumbnail: getFileName(thumbnailFileName),
        author: _id,
        authorAvatar: avatar,
        authorName: username,
      }
      await uploadVideo({
        variables: {
          metaData: JSON.stringify(video)
        }
      })
      setUploading(false) 
    }
  }


  return (
    <div className="fixed-center">
      <div className="flex flex-col px-1.5 py-4 bg-bg-default rounded-lg"
        style={{
          width: 660,
        }}
      >
      <section>
        <CardHeader 
          title="Upload Video"
          close={true}
          Apply={() => upload()}
          loading={loading || uploading}
          Back={() => close()}
          applyText="上传"
        />
      </section>
      <p>{uploadFeedback}{error}</p>
      <section id="content" className="relative mt-2">
        <div>
          <video className="w-full" controls src={ videoUrl } >
          </video>
        </div>
        {
          thumbnailUrl && showThumbnail &&
            <div id="thumbnail" className="absolute top-0 w-full h-full">
              <div className="relative w-full h-full">
                <div className="absolute top-0 right-0 peer"
                  onClick={() => setShowThumbnail(false)}
                >
                  <IconButton Icon={Close} />
                </div>
                <div className="absolute top-1 right-10 invisible peer-hover:visible">
                  <p>Hidden</p>
                </div>
                <img className="w-full h-full" src={thumbnailUrl} alt="thumbnail" />
              </div>
            </div>
        }
      </section>
      <div id="title" className="py-1">
        <TextInput 
          label="TITLE"
          limit={100}
          text={title}
          setText={setTitle}
          type="text"
        />
      </div>
      <section id="file_selector" className="flex justify-between pt-5">
        <div id="thumbnail selector" className="flex items-center space-x-2">
          <FileSelector 
            Display={() => 
              <button className="btn-outline">
                添加图片标题
              </button>
            }
            setFileURL={url => {
              setShowThumbnail(true)
              setThumbnailUrl(url)
            }}
            setFile={setThumbnail}
            setFileSuffix={setThumbnailSuffix}
            accept="image/x-png, image/jpeg, image/svg+xml"
          />
          <div>
            {
              !showThumbnail && 
                <button onClick={() => setShowThumbnail(prev => !prev)}>
                  显示
                </button>
            }
          </div>
        </div>
        <div id="video selector">
          <FileSelector 
             Display={() => 
              <button className="btn-apply">
                <p className="text-white">选择视频</p>
              </button>
            }
             setFileURL={setVideoUrl}
             setFile={setFile}
             setFileSuffix={setVideoSuffix}
             accept="video/mp4,video/x-m4v,video/*"
          />
        </div>
      </section>
      </div>
    </div>
  )
}


