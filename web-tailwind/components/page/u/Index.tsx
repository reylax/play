import { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/themeContext';
import LockScreen  from '../../containers/LockScreen';
import ProcfileEditor  from './ProfileEditor';
import { gql, useLazyQuery} from "@apollo/client";
import PageSearchBar from '../../searchbar/SearchBar';



const GET_USER_INFO = gql`
  query ($username: String!) {
    userInfo(username: $username) {
      username
      introduce
      email
      avatar
      backgroundImage
    }
  }
`

interface props {
  username: string
}

export default function Profile({ username }:props) {
  const { Lang, user, initUserInfo } = useTheme()
  const [showEditor, setShowEditor] = useState(false)

  const [isme, setIsme] = useState(0)

  const [getUserInfo, {loading, error, data}] = useLazyQuery(GET_USER_INFO, {
    variables: { username },
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      let userInfo = data.userInfo
      if (!userInfo) {
        // user not exsited
        setIsme(-1)
      } else if (userInfo.username === user.username) {
        setIsme(1)
      } else {
        setIsme(0)
      }
    }
  });
  useEffect(() => {
    getUserInfo()
  }, [user])

  if (loading) return <p>loading ...</p>
  if (error) return <p>`${error}`</p>
  

  return (
    <div className="min-h-full py-px">
      <section className="relative mb-14">
        <div className='h-200 w-full bg-gray-400'>
          {
            data?.userInfo?.backgroundImage &&
            <img className="h-200 w-full object-cover"
              src={ data.userInfo.backgroundImage } 
              alt="background-img" 
            />
          }
        </div> 
        <div className="absolute rounded-full border-4  border-bg-default bottom-_50 left-2">
          <img className="rounded-full w-36 h-36"
            src= { data?.userInfo?.avatar ||  "/defaultavatar.png" } 
            alt="avatar-img" />
        </div>     
      </section>
      <section className="relative border-b px-4 pb-5 pt-1">
        <p className="font-bold text-xl">{ username }</p>
        <p className="text-sm py-2">{ data?.userInfo?.introduce }</p>
        { isme === 1 && 
            <button className="btn-outline absolute right-4 top-_20"
              onClick={() => setShowEditor(true)}
            >
              <p>{ Lang.profile.editToggle }</p>
            </button>
        }
        {   showEditor && 
              <LockScreen>
                <ProcfileEditor 
                  close={() => setShowEditor(false)}
                  userInfo = {user}
                  initUserInfo={initUserInfo}
                />
              </LockScreen>
        }
      </section>
      <section>
        { isme === -1 && <p>user not existed!</p>}
      </section>
    </div>
  )
}

