import { useState, createContext, useEffect } from "react"
import languages from './lang'
import { useContext } from "react"
import { setItem } from "./cache"
import { useLazyQuery, gql, useMutation } from "@apollo/client"
import useWebSocket from "../components/hooks/useWebSocket"

const themeContext = createContext("" as any)
export const useTheme = () => useContext(themeContext)

export default function ThemeProvider({ children, init: {token, updateToken} }) {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    introduce: "",
    avatar: "",
    backgroundImage: "",
    liked: new Set(),
  })

  const path = user._id ? `${process.env.NEXT_PUBLIC_MATCH_WEBSOCKET_PATH}/?id=${user._id}` : ""
  const [matchSocket, matchSocketSend] = useWebSocket(path)
  const [TalkPanelState, setTalkPanelState] = useState("init")

  const [Lang, setLang] = useState(languages.english)
  const [theme, setTheme] = useState({
    primary: "blueHeart",
    background: "default",
    mode: "light",
  })

  const [refreshToken] = useMutation(RefreshToken, {
    onCompleted: data => {
      let {status, message} = data.refreshToken
      if (status == 201) {
        setItem("token", message)
      } else {
        updateToken("")
      }
      
    },
    onError: error => console.log(error.message)
  })
  
  const [initUserInfo] = useLazyQuery(INIT_USER_SELF, {
    fetchPolicy: "network-only",
    onCompleted: data => {
      setUser(prev => ({
        ...prev,
        ...data.initUserSelf,
        liked: new Set(data.initUserSelf.liked),
      }))
    },
    onError: error => console.log(error.message)
  })

  useEffect(() => {
    if (token) {
      initUserInfo()
      refreshToken()
    }
  }, [token])

  const changePrimary = color => {
    document.body.setAttribute("primary", color)
    setTheme(prev => ({
      ...prev,
      primary:color,
    }))
  }

  const changeBackground = color => {
    document.body.setAttribute("background", color)
    setTheme(prev => ({
      ...prev,
      background:color,
    }))
  }

  const changeMode = mode => {
      document.body.setAttribute("mode", mode)
      setTheme(prev => ({
        ...prev,
        mode,
      }))
    }

  const changeLanguage = lang => {
    setLang(languages[lang])
  }



  const initValue = {
    updateToken,
    theme,
    Lang,
    changeLanguage,
    changePrimary,
    changeMode,
    changeBackground,
    user,
    initUserInfo,
    setUser,
    matchSocket,
    matchSocketSend,
    TalkPanelState, 
    setTalkPanelState
  }

  return (
    <themeContext.Provider value={ initValue }>
      { children }
    </themeContext.Provider>
  )
}

export const INIT_USER_SELF = gql`
  query {
    initUserSelf {
      _id
      username
      introduce
      email
      avatar
      backgroundImage
      liked
    }
  }
`

const RefreshToken = gql`
  mutation {
    refreshToken {
      status
      message
    }
  }
`