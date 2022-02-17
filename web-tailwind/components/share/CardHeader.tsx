import { LeftArrow, Close } from '../../public/svgs';

interface props {
  title: string
  applyText: string
  Back: Function
  Apply: Function
  close: boolean
  loading: boolean
}

export default function CardHeader ({ close, title, applyText, Back, Apply, loading }:props) {
  return (
      <div className="flex items-center justify-between p-2">
        <div className=" flex items-center " >
          <button className="w-7 h-7 p-1 rounded-full hover:bg-primary-50 active:bg-primary_100 text-primary-500"
            onClick={ () => Back() }
          >
            { close ? <Close /> : <LeftArrow /> }
          </button>
          <pre className="font-display text-xl mx-4 font-semibold">{ title }</pre>
        </div>
        <div className='relative flex justify-center items-center'>
          <button className="btn-apply"
            onClick={ () => Apply() }
          >
            <p className="font-display text-white">{ applyText }</p>
            <div className='fixed-center'>
              { loading && <img src='/loading.svg' alt='pending...' /> }
            </div>
          </button>
        </div>
      </div>
  )
}