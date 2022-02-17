import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useTheme } from '../../../contexts/themeContext'


const LEAVE_COMMENT = gql`
  mutation ($comment:String!) {
    leaveComment(comment:$comment) {
      status
      message
    }
  }
`

export default function LeaveComent({ subject, id, close }) {
  const [commentOnFoucs, setCommentOnfoucs] = useState(false)
  const [textLength, setTextLength] = useState(0)
  const [comment, setComment] = useState("")
  const [showSubmitPanel, setShowSubmitPanel] = useState(false)
  const onchange = event => {
    let text = event.target.value
    setComment(text)
    setTextLength(text.length)
  }

  const { user:{username, avatar, _id}} = useTheme()

  const [leaveComment, { loading }] = useMutation(LEAVE_COMMENT, {
    variables: {
      comment: JSON.stringify({
          subject: subject,
          referId: id,
          content: comment,
          authorName: username,
          authorAvatar: avatar,
          author: _id,
      })
    },
    onCompleted: data => {
      console.log(data)
      setComment("")
      if (close) close()
      setShowSubmitPanel(false)
    },
    onError: error => {
      console.log(error)
    }
  })
  return (
    <div className='flex flex-col py-5'>
      <div className={`self-stretch`}>
        <input
          onFocus={() => {
            setCommentOnfoucs(true)
            setShowSubmitPanel(true)
          }}
          onBlur={() => setCommentOnfoucs(false)} 
          className={`outline-none w-full px-5 py-1 ${commentOnFoucs ? "border-b border-black" :"border-b"}`}
          placeholder='leave comment'
          value={comment}
          onChange={onchange}
          autoFocus={Boolean(close) ? true : false}
        />
        { showSubmitPanel && 
          <div className='px-2 py-1 flex justify-between'>
            <button className={`px-3.5 border ${textLength > 0 && "border-red-500"} rounded-sm hover:bg-red-50 hover:text-red-500 font-medium`}
              onClick={event => {
                event.stopPropagation()
                if (Boolean(close)) close()
                setShowSubmitPanel(false)
              }}
            >
              删除
            </button>
            <div className='relative flex justify-center items-center'>
              <button className={ `${textLength > 0 ? "bg-green-500" : "bg-gray-500"} px-3.5  hover:bg-green-600 active:bg-green-700 text-white rounded-sm`}
                onClick={ () => leaveComment() }
              >
                <p className="font-display text-white">发表</p>
                <div className='fixed-center'>
                  { loading && <img src='/loading.svg' alt='pending...' /> }
                </div>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}