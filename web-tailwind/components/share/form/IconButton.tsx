

export default function IconButton({ Icon }) {
  return (
    <div className="flex items-center justify-center rounded-full w-8 h-8 cursor-pointer hover:bg-d-div text-gray-100">
      <div className="w-5 font-bold">
        <Icon />
      </div>
    </div>
  )
}