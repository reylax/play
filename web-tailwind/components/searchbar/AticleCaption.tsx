import Link from 'next/link'

export default function AticleCaption({title, des, authorName, id}) {
  return (
    <Link href={`/read?blog_id=${id}`}>
      <div className="w-full px-5 py-2 space-y-1 border-b rounded-lg">
        <p className="font-semibold">{title}<span className='font-medium'>—— {authorName}</span></p>
        <p>{des}...</p>
      </div>
    </Link>
  )
}