

export default function Avatar({authorAvatar, authorName}) {
  return (
    <div className="rounded-full relative">
      <div className="cursor-pointer peer">
        <img className="rounded-full" src={authorAvatar||"/defaultavatar.png"} alt="" />
      </div>
      <div className="absolute top-1/4 right-full mr-2 h-3/4 flex items-center invisible peer-hover:visible bg-gray-900 rounded-md p-1.5">
        <pre className="text-white"><span>{authorName}</span></pre>
      </div>
    </div>
  )
}