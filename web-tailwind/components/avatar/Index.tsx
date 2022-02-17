import Entrance from "./Entrance"
import UserInfo from "./UserCard";
import { useTheme } from "../../contexts/themeContext";




export default function Avatar() {

  const { user } = useTheme()
  return (
    <div className="bg-bg-active rounded-md">
      {
        user?.username
          ?  <UserInfo 
                username={user.username}
                introduce={user.introduce}
                avatar={user.avatar}
              />
          :  <Entrance />
      }
    </div>
  )
}

