import HomeLayout from "../../components/containers/HomeLayout";
import Talk from "../../components/page/talk/Index";
import { useRouter } from 'next/router';

export default function Index() {
  const {query} = useRouter()
  if (!query.videoId ) return <p> loading...</p>

  return (
        <HomeLayout 
          Page={ () => <Talk 
                          videoId={ query.videoId }
                          targetId={ query.targetId }
                        /> 
              }
    />
  )
}