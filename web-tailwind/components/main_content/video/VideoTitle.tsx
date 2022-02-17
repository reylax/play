import Comment from "../comment/Comment";

export default function VideoTitle({id, title, 
                                    authorName, authorAvatar, 
                                    numberOfpros, numberOfreplies}) {
  return (
    <Comment
      id={id} 
      content={title}
      authorName={authorName}
      authorAvatar={authorAvatar}
      numberOfpros={numberOfpros}
      numberOfreplies={numberOfreplies}
      size="w-9 h-9"
      replyLevel={2}
      subject="video"
  />
  )
}