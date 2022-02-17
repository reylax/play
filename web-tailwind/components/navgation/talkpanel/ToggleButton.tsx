export default function Idicator({message, onClick}) {
  return (
    <button className="self-start w-full py-2 rounded-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700"
      onClick={() => onClick()}
    >
      <p className='text-white font-body font-semibold tracking-wider'>{message}</p>
    </button>
  )
}