import React, {useState} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const MyEditor = () => {


  const [note, setnote] = useState('')


  console.log(note);
  return (
    
    <div>
       <ReactQuill value={note} onChange={setnote} />
    </div>
  )
}

export default MyEditor