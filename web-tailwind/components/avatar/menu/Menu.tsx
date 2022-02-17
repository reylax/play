import { Palette, Logout, BlackList, VideoUpload } from "../../../public/svgs"
import Entry from './Entry'
import Display from "../display/Index"
import Lockscreen from "../../containers/LockScreen"
import { useState } from "react"
import { useTheme } from "../../../contexts/themeContext"
import VideoUploader from "../../main_content/video/VideoUpload"


export default function Menu() {
  
  const [showDisplayPalette, setShowDisplayPalette] = useState(false)
  const [showVideoUploader, setShowVideoUploader] = useState(false)
  const {setUser, updateToken} = useTheme()

  const menus = [
    {
      Icon: VideoUpload,
      text: "Upload video",
      isExtended: true,
      onClick: () => setShowVideoUploader(true),
    },
    {
      Icon: Palette,
      text: "Display",
      isExtended: true,
      onClick: () => setShowDisplayPalette(true),
    },
    {
      Icon: BlackList,
      text: "Black List",
      isExtended: true,
      onClick: () => {}
    },
    {
      Icon: Logout,
      text: "Log out",
      isExtended: false,
      onClick: () => {
        updateToken("")
        setUser({})
      }
    },
  ]

  return (
    <div className="bg-bg-paper shadow py-1 rounded-sm">
      { menus.map(({ Icon, text, isExtended, onClick }, index) => 
          <Entry
            key={index} 
            Icon={ Icon }
            text={ text }
            isExtended={ isExtended }
            onClick={ onClick }
          />
        )
      }
      { showDisplayPalette && 
          <Lockscreen>
            <div className="fixed-center w-585">
                <Display 
                  setShowDisplay={setShowDisplayPalette}
                />
            </div>
          </Lockscreen>
      }
      {
          showVideoUploader && 
            <Lockscreen>
              <div>
                <VideoUploader 
                  close={() => setShowVideoUploader(false)}
                />
              </div>
            </Lockscreen>
      }
    </div>

  )
}
