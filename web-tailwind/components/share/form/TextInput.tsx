import { useState } from "react"

interface props {
  label: string
  limit: number
  text: string
  setText: Function
  type: string
}

export default function TextInput({ label, limit, text, setText, type }:props) {
  const [focus, setFocus] = useState(false)
  var primary = getComputedStyle(document.body).getPropertyValue('--primary_500')
  const focused = focus ? { boxShadow: `0px 0px 0px 1px ${primary}`} : {}

  const [numberOftext, setNumberOftext] = useState(0)

  const onchange = event => {
    let text = event.target.value
    setText(text)
    setNumberOftext(text.length)
  }

  return (
    <div className="border border-d-div rounded-md px-1.5 py-1"
      style={focused}
    >
      <div className="flex justify-between">
        <p className={focus ? "text-primary-500" : ""}>{ label }</p>
        <p>{numberOftext} / { limit }</p>
      </div>
      <input className="outline-none w-full resize-none bg-bg-default text-c-body" 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={ onchange }
        value={ text }
        type={ type }
      />
  </div>
  )
}