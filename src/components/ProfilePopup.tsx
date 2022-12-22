import React, { useState } from "react";
import "../Popup.css";
import FileUpload from "./FileUpload";

export default function ProfilePopup({ name, setPopupOpen }: any) {
  const [postContent, setPostContent] = useState("");
  
  return (
    <>
      <div className="profilePopupCont">

        <div className="popupBox">

        <div className="fileUploadContainer">
            <i className="fileUploadForm"/>
            <FileUpload name={name} setPopupOpen={setPopupOpen} />
        </div>

        <div className="buttonDiv">
          <button onClick={()=>setPopupOpen(false)}>✕</button>
        </div>

        </div>

      </div>
    </>
  );
}


// <input type='input' onChange={(e)=> {
//   setPostContent(e.target.value)
// }}/>
// <button onClick={postImage}>submit</button>
// <button onClick={()=>setPopupOpen(false)}>Cancel</button>
{/* <i className="fileUploadForm" /> Upload a Profile Picture
<FileUpload /> */}