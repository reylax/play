import HomeLayout from "../../components/containers/HomeLayout";
import { useRouter } from 'next/router';
import BlogReader from "../../components/main_content/blog/BlogReader";

export default function Index() {
  const {query} = useRouter()
  if (!query.blog_id ) return <p> loading...</p>

  return (
    <HomeLayout 
      Page={ () => <BlogReader 
                    blog_id={ query.blog_id }
    /> }
    />
  )
}