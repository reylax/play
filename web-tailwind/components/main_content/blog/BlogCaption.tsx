import { gql, useQuery } from "@apollo/client"
import { useRouter } from 'next/router'

const GET_BLOG_CAPTION = gql`
  query ($blog_id: String!) {
    getBlogCaption(blog_id: $blog_id) {
      title
      description
      authorName
    }
  }
`

export default function BlogCaption({blog_id="620693daf6e2612e48b95837"}) {

  const { data, loading } = useQuery(GET_BLOG_CAPTION, {
    variables: {
      blog_id,
    },
  })

  const router = useRouter()

  if (loading || !data) return <p>loading ...</p>

  return (
    <div className="p-5 border-b cursor-pointer"
      onClick={() => router.push(`/read?blog_id=${blog_id}`)}
    >
      <p>{data.getBlogCaption.description}<span>....</span></p>
      <div className="flex flex-row-reverse">
        <p className="font-bold text-xl">{data?.getBlogCaption.title}<span className="font-normal text-lg">—— {data?.getBlogCaption.authorName}</span></p>
      </div>
    </div>
  )
}