import HomeLayout from "../../components/containers/HomeLayout";
import Profile from "../../components/page/u/Index";
import { useRouter } from 'next/router';

export default function Index() {
  const {query} = useRouter()
  if (!query.userId ) return <p>loading...</p>
  return (
    <HomeLayout 
      Page={ () => <Profile 
                    username={ query.userId }
                   /> }
    />
  )
}
