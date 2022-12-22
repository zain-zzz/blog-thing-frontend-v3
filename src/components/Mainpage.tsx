import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebaseconfig'
import {NavLink} from 'react-router-dom';
import PostPopup from './PostPopup.jsx';
import '../App.css'

export default function Mainpage({setIsAuth, isAuth}: any) {

  const [posts, setposts] = useState([])
  const [username, setusername] = useState<string | null>()
  const [popupOpen, setPopupOpen] = useState(false)

  async function fetchData() {
    const response = await fetch('http://localhost:3003/posts')
    const data = await response.json()
    setposts(data.reverse())
  }
  
  async function getUsername() {
    fetch('http://localhost:3003/getUsername/' + auth.currentUser?.email)
    .then(res => res.text())
    .then(text => {
      console.log(text)
      setusername(text)
    });
  }
  
  useEffect(() => {
    if (posts.length === 0) {
      fetchData()
      getUsername()
      
      setInterval(function () {
        fetchData()
      }, 5000);
    }
  }, [posts])

  const [name, setName] = useState<string | null>()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser?.email)
      setIsAuth(true)
    } else {
      navigate('/login')
    }
  })

  

  function logOut() {
    signOut(auth)
    navigate('/login')
  }


  // setInterval


  return (
    <>
      <section className='feedContainer'>

      <section className='left'>
        <h2>Feed</h2>
        <NavLink to={'/dashboard'}>Dashboard</NavLink>
        <button onClick={logOut}>Logout</button>
        </section>


      <section className='middle'>
        <div className="verticalPost">
          {posts.map((current:any) => {
            return(
              <div className="postContainer">
                <h1>{current.username}</h1>
                <h3>{current.content}</h3>
              </div>
            )
          })}
        </div>
      </section>


      <section className='right'>
      <h1>{username} is logged in!</h1>
      {popupOpen && <PostPopup name={name} setPopupOpen={setPopupOpen}/>}
      <button onClick={() => setPopupOpen(true)}>Post</button>
      </section>


    </section>
  </>
  )
}
