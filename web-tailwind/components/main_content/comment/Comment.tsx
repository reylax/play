import CommentMenu from "./CommentMenu"
import Avatar from "./menus/Avatar"
import { useState } from "react"
import Comments from "./Comments"
import LeaveComment from './LeaveComment'

interface props {
  id: string
  content: string
  authorName: string
  authorAvatar: string
  size: string
  replyLevel: number
  numberOfreplies: number
  numberOfpros: number
  subject: string
}



export default function Comment({id, content, authorName, authorAvatar, size, replyLevel, numberOfpros, numberOfreplies, subject}:props) {
    const [showReplies, setShowReplies] = useState(false)
    const [showLeaveCommentCard, setShowLeaveCommentCard] = useState(false)

    return (
    <>
      <section className="flex justify-between border-b pr-2 pl-5 cursor-pointer w-full"
        onClick={() => setShowReplies(prev => !prev)}
      >
        <div className="flex-1 mr-4">
          <div className="pt-2">
            <p className="break-all">{content}</p>
          </div>
          <div>
            <CommentMenu
              referId={id}
              size={size}
              replyLevel={replyLevel}
              numberOfreplies={numberOfreplies}
              numberOfpros={numberOfpros}
              LeaveCommentCardToggle={() => setShowLeaveCommentCard(prev => !prev)}
              subject={subject}
            />
          </div>
        </div>
        <div className="w-12 h-12 mt-3.5 mr-1">
          <Avatar 
            authorName={authorName}
            authorAvatar={authorAvatar}
          />
        </div>
      </section>
      { showLeaveCommentCard && 
        <section>
          <LeaveComment 
            subject={subject}
            id={id}
            close={() => setShowLeaveCommentCard(prev => !prev)}
          />
        </section>
      }
      <section className={replyLevel == 1 ? "border-l border-primary-400": ""}>
      { showReplies &&
          <Comments 
            subject={subject}
            id={id}
            replyLevel={replyLevel-1}
          />
      }
      </section>
    </>
    )
}