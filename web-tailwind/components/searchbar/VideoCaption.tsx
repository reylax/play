import Link from 'next/link'


export default function VideoCaption({title, des, authorName, id}) {
  return (
    <Link href={`/talk?videoId=${id}`}>
      <div className="w-full flex px-5 py-1">
        <div className='w-2/5 h-20'>
          <img className='w-full h-full'
            src={des} 
            alt="talk-video-thumbnail" 
          />
        </div>
        <div className="w-full px-5 border-b flex flex-col justify-evenly">
          <p className="font-semibold">{title}</p>
          <p>{authorName}</p>
        </div>
      </div>
    </Link>
  )
}