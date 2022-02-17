import { useEffect, useState } from "react"
import { HEART, LIKEED } from "../../../../public/svgs"
import { gql, useMutation } from "@apollo/client"
import { useTheme } from "../../../../contexts/themeContext";


interface props {
  size: string
  numberOfpros: number
  referId: string | string[]
  subject: string
}

const LIKE = gql`
  mutation ($subject:String!, $referId: String!, $inc: Int!) {
    like(subject:$subject, referId:$referId, inc:$inc) {
      status
      message
    }
  }
`

export default function Favorite({ size, numberOfpros, referId, subject }:props) {
  const {user} = useTheme()

  const [favorites, setFavoritess] = useState(0)
  const [like] = useMutation(LIKE)

  useEffect(() => {setFavoritess(numberOfpros)}, [numberOfpros])

  const liked = user?.liked?.has(referId)

  const textColor = liked ? "text-red-500" : "text-c-body"
  

  return (
    <div className="flex items-center group hover:text-red-500 cursor-pointer group"
      onClick={event => {
        event.stopPropagation()
        var inc
        if (user?.liked?.has(referId)) {
          setFavoritess(prev => prev-1)
          inc = -1
          user.liked.delete(referId)
        } else {
          setFavoritess(prev => prev+1)
          inc = 1
          user.liked.add(referId)
        }
        
        like({
          variables: {
            subject,
            referId,
            inc,
          }
        })
      }}
    >
      <div className={`${size} ${textColor} p-1.5 rounded-full mr-1 group-hover:bg-red-100`}>
        { liked ? <LIKEED /> : <HEART /> }
      </div>
    { favorites > 0 && 
      <p className={`${textColor} text-c-hint group-hover:text-red-500`}>{favorites}</p>
    }
  </div>
  )
}