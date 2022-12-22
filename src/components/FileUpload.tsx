import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "../Popup.css";
import { auth } from "../firebaseconfig";
import { NavLink } from "react-router-dom";

const FileUpload = ({ name, setPopupOpen }: any|null) => {
  const [file, setFile] = useState<any>("");
  const [filename, setFilename] = useState<string | null>("Image preview");
  const [uploadedFile, setUploadedFile] = useState<object>({});
  const [username, setusername] = useState<string | null>("");
  const [selectedImage,setSelectedImage] = useState<string>("https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg");
  // const [id, setId] = useState<string>("");

  // function makeid(length: number) {
  //   var result = "";
  //   var characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  let tempUsernameBool = true;

  async function getUsername() {
    fetch("http://localhost:3003/getUsername/" + auth.currentUser?.email)
      .then((res) => res.text())
      .then((text) => {
        //console.log(text);
        setusername(text);
      });
  }

  if (tempUsernameBool) {
    getUsername();
    tempUsernameBool = false;
  }

  const onChange = (e:any) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setSelectedImage(URL.createObjectURL(e.target.files[0]))
  };

  const onSubmit = async (event:any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", `${username}`);
    try {
      const res = await axios.post("http://localhost:3003/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { filename, filePath } = res.data;

      setUploadedFile({ filename, filePath });
      
    } catch (err:any) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log("There was a problem with the file");
      }
    }

    setPopupOpen(false)

  };

  return (
    <Fragment>
      <div className="popupText">
        <h1>Change profile picture:</h1>
      </div>

      <img className="previewImage"src={selectedImage}/>

      <p>{filename}</p>

      <form onSubmit={onSubmit}>
        <br />

        <div>
          <input
            type="file"
            className="custom-file-input"
            onChange={onChange}
          />
        </div>

        <br />


        <input type="submit" value="upload" className="submit-button" />


      </form>
    </Fragment>
  );
};
export default FileUpload;