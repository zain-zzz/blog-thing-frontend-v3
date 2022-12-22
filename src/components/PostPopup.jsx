import React, { useState } from 'react'
import '../Popup.css'

export default function PostPopup({name, setPopupOpen}) {
  
  const [postContent, setPostContent] = useState('')
  

  async function postImage() {
    const response = await fetch('http://localhost:3003/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: name,
        content: postContent
      })
    })
    setPopupOpen(false)
  }

  return (
    <>
    <div className="popupCont">
      <div className="popupText">
    <h1>New Post</h1>
    <textarea rows="5" cols="80" type='input' onChange={(e)=> {
      setPostContent(e.target.value)
    }}/>
    <div className='buttonsDiv'>
    <button onClick={postImage}>submit</button>

    <button onClick={()=>setPopupOpen(false)}>Cancel</button>
    </div>
    </div>
    </div>
    </>
  )
}
