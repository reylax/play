import Comment from "./Comment";
import { gql, useQuery } from "@apollo/client"


const GET_COMMENTS = gql`
  query ($subject:String!, $id:String!) {
    getComments(subject:$subject, id:$id) {
      _id
      author
      authorName
      authorAvatar
      content
      numberOfpros
      numberOfreplies
    }
  }
`

interface props {
  subject: string
  id: string | string[]
  replyLevel: number
}

export default function Comments({subject, id,  replyLevel}:props) {
  const { data, loading } = useQuery(GET_COMMENTS, {
    variables: {
      subject,
      id,
    },
    // pollInterval: 1000, // ls
    fetchPolicy: "network-only",

  })
  if (loading || !data) return <p></p>
  return (
    <div className="max-h-100 overflow-y-auto scrollbar-hide"
      onWheel={e => e.stopPropagation()}
    >
      {data.getComments.map(({_id, content, authorName, authorAvatar, numberOfpros, numberOfreplies}) => 
        <Comment
          id={_id}
          key={_id} 
          content={content}
          authorName={authorName}
          authorAvatar={authorAvatar}
          size="h-7.5 w-7.5"
          replyLevel={replyLevel}
          numberOfpros={numberOfpros}
          numberOfreplies={numberOfreplies}
          subject='comment'
      />
      )}
    </div>
  )
}