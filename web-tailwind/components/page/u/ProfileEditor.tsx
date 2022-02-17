import CardHeader from "../../share/CardHeader";
import AvatarSelector from "./toggle/AvatarSelector";
import BackgroundSelector from "./toggle/BackgroundSelector";
import TextInput from '../../share/form/TextInput';
import AvatarEditor from "./editor/AvatarEditor";
import BackgroundEditor from "./editor/BackgroundEditor";
import { useState } from "react";
import { useMutation , gql } from "@apollo/client";
import useTencentCOS from "../../hooks/tencentYun/useTencentCOS"

const UPDATUSER = gql`
  mutation ($newInfo: String!) {
    updateUser(newInfo: $newInfo) {
      status
      message
    }
  }
`

interface props {
  close: Function
  userInfo: any
  initUserInfo: Function
}

export default function ProcfileEditor({ close, userInfo, initUserInfo }:props) {

  const [display, setDisplay] = useState("defalut")
  const [previewAvatar, setPreviewAvatar] = useState(userInfo.avatar)
  const [newAvatarFile, setNewAvatarFile] = useState()
  const [selectAvatar, setSelectAvatar] = useState()
  const [previewBgImg, setPrevBgImg] = useState(userInfo.backgroundImage)
  const [newBackground, setNewBackground] = useState()
  const [selectBackground, setSelectBackground] = useState()
  const [name, setName] = useState(userInfo.username)
  const [introduce, setIntroduce] = useState(userInfo.introduce)
  const [uploading, setUploading] = useState(false)

  const {upLoadingRate, postFileToTencentYun} = useTencentCOS()


  const [updateUser, {loading}] = useMutation(UPDATUSER, {
    onCompleted: response => {
      console.log(response)
    },
    onError: error => {
      console.log(error.message)
    },
  })

  const updateUserInfo = async () => {
    // if nothing changed
    if (userInfo.username == name && userInfo.introduce == introduce && !newAvatarFile && !newBackground) 
      return
    // meta data to mongodb
    if (userInfo.username !== name || userInfo.introduce !== introduce) {
      let newInfo = {
        username: name,
        introduce: introduce,
      }
      updateUser({
        variables: {
          newInfo: JSON.stringify(newInfo)
        }
      })
    }
    setUploading(true)
    // images to tecentYun
    if (newAvatarFile) {
      await postFileToTencentYun({file: newAvatarFile, purpose: "avatar", fileExtention: ".png"})
    }
    if (newBackground) {
      await postFileToTencentYun({file: newBackground, purpose: "backgroundImage", fileExtention: ".png"})
    }
    // sync userinfo
    await initUserInfo()
    setUploading(false)
  }

  switch(display) {
    case "edit avatar":
      return <AvatarEditor 
              img={selectAvatar}
              back={() => setDisplay("defalut")}
              save={(imgUrl, imgFile) => {
                setPreviewAvatar(imgUrl)
                setNewAvatarFile(imgFile)
                setDisplay("defalut")
              }}
            />
    case "edit background":
      return <BackgroundEditor 
                img={selectBackground}
                back={() => setDisplay("defalut")}
                save={(imgUrl, imgFile) => {
                  setPrevBgImg(imgUrl)
                  setNewBackground(imgFile)
                  setDisplay("defalut")
                }}
             />
    default:
      return (
        <div className="fixed-center w-585 bg-bg-default rounded-2xl py-1 pb-10">
          <CardHeader 
            close={true}
            title={ "Edit profile"}
            applyText={ "Save" }
            Back={ close }
            Apply={ () => updateUserInfo() }
            loading={loading || uploading}
          />
          <section className="relative mb-24 p-1">
            <div className="h-200 w-full bg-gray-500">
              { previewBgImg && 
                <img className="h-200"
                  src={ previewBgImg } 
                  alt="background-img" 
                />
              }
              <div className="fixed-center">
                <BackgroundSelector 
                  setFileURL={url => {
                    setSelectBackground(url)
                    setDisplay("edit background")
                  }}
                />
              </div>
            </div>
            <div className="absolute rounded-full border-4 border-bg-default bottom-_80 left-2">
              <div className="relative">
                <img className="rounded-full w-32 h-32"
                  src= { previewAvatar || "/defaultavatar.png" } 
                  alt="avatar-img" />
                <div className="fixed-center">
                  <AvatarSelector 
                    setFileURL={ url => {
                      setSelectAvatar(url)
                      setDisplay("edit avatar")
                    } 
                  }
                  />
                </div>
              </div>
            </div>     
          </section>
          <form className="space-y-5 px-2 my-6">
            <TextInput 
              label={ "Name" }
              limit={ 20 }
              text={name}
              setText={setName}
              type="text"
            />
            <TextInput 
              label={ "Bio" }
              limit={ 150 }
              text={introduce}
              setText={setIntroduce}
              type="text"
            />
          </form>
        </div>
      )
  
  }
}
