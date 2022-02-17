import HomeLayout from "../../components/containers/HomeLayout";
import dynamic from "next/dynamic";

const Write = dynamic(() => import('../../components/page/write/Write'),{ ssr: false })


export default function Index() {
  return (
    <HomeLayout 
      Page={ () => <Write /> }
    />
  )
}
