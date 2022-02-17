import HomeLayout from "../../components/containers/HomeLayout";
import Profile from "../../components/page/u/Index";
import { useRouter } from 'next/router';

export default function Index() {
  const { asPath } = useRouter()
  const username = asPath.substring(asPath.lastIndexOf("/")+1)
  return (
    <HomeLayout 
      Page={ () => <Profile 
                    username={ username }
                   /> }
    />
  )
}
