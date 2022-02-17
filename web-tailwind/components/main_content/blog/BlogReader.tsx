import { gql, useQuery } from '@apollo/client'
import dynamic from "next/dynamic"
import Comments from '../comment/Comments'
import LeaveComent from '../comment/LeaveComment'
import Like  from '../comment/menus/Like';


const EditorJs = dynamic(() => import('./EditorJs'),{ ssr: false })

interface props {
  blog_id: string | string[]
}

const READ_BLOG = gql`
  query ($blog_id:String!) {
    readBlog(blog_id:$blog_id) {
      title
      content
      authorName
      authorAvatar
      numberOfpros
    }
  }
`

export default function BlogReader({ blog_id }:props) {
  const { data, loading } = useQuery(READ_BLOG, {
    variables: {
      blog_id,
    }
  })
  if (loading || !data) return <p>loading ...</p>
  const { title, content, authorName, authorAvatar, numberOfpros } = data.readBlog

  return (
    <div>
      <section className='pl-12 text-c-body flex flex-col'>
        <div>
          <p className='text-2xl font-semibold py-2.5'>{title}</p>
        </div>
        <div>
          <EditorJs
            data={JSON.parse(content)}
          />
        </div>
      </section>
      <section className='relative bottom-72 z-10'>
        <div className='m-auto flex justify-center py-7 items-center'>
          <Like 
            size='w-12 h-12'
            referId={blog_id}
            subject='blog'
            numberOfpros={numberOfpros}
          />
        </div>
        <div className='py-5'>
          <LeaveComent 
            subject={"blog"}
            id={blog_id}
            close={null}
          />
        </div>
        <div className="border-t">
            <Comments 
              subject='blog'
              id={blog_id}
              replyLevel={1}
            />
        </div>
        <div className='flex flex-row-reverse px-5 relative mt-12'>
            <p>内容贡献者——{authorName}</p>
        </div>
      </section>
    </div>
  )
}