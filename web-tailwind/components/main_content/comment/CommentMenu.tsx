import AddComment from "./menus/Replies";
import Favorite from "./menus/Like";
import Share from "./menus/Share";

interface props {
  referId: string
  size: string  // tailwind css
  replyLevel: number
  numberOfreplies: number
  numberOfpros: number
  LeaveCommentCardToggle: Function
  subject: string
}


export default function CommentMenu({subject, referId, size, replyLevel, numberOfreplies, numberOfpros, LeaveCommentCardToggle}:props) {
  return (
    <div className="flex space-x-12 relative py-1.5">
      { replyLevel > 0 && 
        <AddComment 
          numOfcomments={numberOfreplies}
          size={size}
          toggle={LeaveCommentCardToggle}
        />
      }
      { replyLevel > 0 && 
        <Share 
          size={size}
        />
      }
      <Favorite 
        size={size}
        numberOfpros={numberOfpros}
        referId={referId}
        subject={subject}

      />
    </div>
  )
}