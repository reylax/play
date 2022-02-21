import { useState  } from "react"
import NavItem from "./NavItem"
import { useTheme } from "../../contexts/themeContext";
import { 
  Home, HomeFcous, 
  Notification, NotificationFcous,
  Message,MessageFcous,
  Bookmarks, BookmarksFcous,
  List, ListFcous
} from '../../public/svgs'
import Avatar from '../avatar/Index';
import TalkPanel from "./talkpanel/Index";


export default function Navgation() {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const { Lang } = useTheme()

    return (
      <div className="flex justify-between items-center flex-col h-full">
        <div className="flex flex-col justify-between items-start h-full py-2">
          <section>
            <p className="font-body text-3xl font-semibold hover:cursor-pointe xl:pb-5 lg:pb-2 text-logo">
              { Lang.navBar.siteName }
            </p>
            <div className="2xl:space-y-4 lg:space-y-2.5">
              { items.map(
                  (menu, index) => 
                    <NavItem
                        key={index} 
                        Icon={menu.Icon}
                        FcousIcon={menu.FocusedIcon}
                        text={menu.text}
                        index={index}
                        focused={ index === activeIndex }
                        onPress={ (index : number) => setActiveIndex(index) }
                    />)
              }
            </div>
            <section className="lg:mt-5 xl:mt-7">
              <div className="">
                  <TalkPanel 
                    videoId={"random"}
                  />
                </div>
          </section>
          </section>
          <div className="">
            <Avatar />
          </div>
        </div>
      </div>
    )
}

const items = [
  { 
    Icon: Home,
    FocusedIcon: HomeFcous,
    text: "home",
  },
  {
    Icon: Notification,
    FocusedIcon: NotificationFcous,
    text: "notifications",
  },
  {
    Icon: Message,
    FocusedIcon: MessageFcous,
    text: "messages",
  },
  {
    Icon: Bookmarks,
    FocusedIcon: BookmarksFcous,
    text: "bookmarks",
  },
  {
    Icon: List,
    FocusedIcon: ListFcous,
    text: "list",
  },
]