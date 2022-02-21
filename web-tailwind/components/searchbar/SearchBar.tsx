import { LeftArrow, Search } from "../../public/svgs"
import { useState } from "react"
import Fuse from "fuse.js"
import PedictCards from "./PedictCards"


const books = [
  {
    id:"620693daf6e2612e48b95837",
    title: "弟弟",
    authorName: "张爱玲",
    des: "我弟弟生的很美而我一点都不。从小我们家里谁都惋惜着",
    type: "blog"
  },
  {
    id:"620d0d29a8a16d3c3c4a0e34",
    title: "留情",
    authorName: "张爱玲",
    des: "生在这世上，没有一样感情不是千疮百孔的。",
    type: "blog"
  },
  {
    id: "6207d5195e3caf4598bfc15f",
    title: "华尔街之狼-How to sell stocks!",
    authorName: "张爱玲",
    des: "/sample.jpeg",
    type: "video",
  }
]

const fuse = new Fuse(books, {
  keys: ['title', 'authorName', 'des']
})

export default function PageSearchBar() {
  const [fcoused, setFcoused] = useState(false)
  const color = fcoused ? "text-primary-500" : "text-c-secondary"
  const borderColor = fcoused ? "border-primary-500": "border-d-transparent"
  const bgColor = fcoused ? "bg-b-default" : "bg-b-active"

  const [value, setValue] = useState("")
  const [searchPedicts, setSearchPedicts] = useState([])
  const [showPedictCard, setShowPedictCard] = useState(false)

  const handleOnchange = event => {
    let text = event.target.value
    setSearchPedicts(fuse.search(text))
    setValue(text)
  }

  return (
      <div className="bg-bg-default">
        <div className={`flex py-2 border-b px-5 items-center`}>
          <section className={`relative flex-1 ${borderColor} ${bgColor} border rounded-full px-5`}>
            <div className="flex items-center h-8">
              <div className={`w-4 h-4 ${color}`}>
                <Search />
              </div>
              <input className="outline-none px-3.5 bg-transparent flex-1 text-c-body"
                onFocus={ () => {
                  setFcoused(true) 
                  setShowPedictCard(true)
                }} 
                onBlur={ () => { 
                  setFcoused(false) 
                  setShowPedictCard(false)
                }}
                type="text" 
                placeholder="Serach Interest" 
                value={value}
                onChange={handleOnchange}
              />
            </div>
            { showPedictCard && 
              <div className="absolute left-0 top-8 mt-px w-full bg-bg-default shadow-lg rounded-lg z-10">
                <PedictCards pedicts={searchPedicts} 
                 close={() => setShowPedictCard(false)}
                />
              </div>
            }
          </section>
          <button className="w-8 h-8 p-1.5 rounded-full hover:bg-primary-50 active:bg-primary_100 text-primary-500 ml-8">
            <LeftArrow />
          </button>
        </div>
      </div>
  )
}