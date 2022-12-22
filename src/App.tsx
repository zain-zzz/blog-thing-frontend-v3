import React from 'react';
import { useState } from "react";
import {Route, Routes} from 'react-router';
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Mainpage from "./components/Mainpage";
import Signup from "./components/Signup";

function App() {

  const [isAuth, setIsAuth] = useState(false)

  return (
    <Routes>
      <Route path="/" element={<Mainpage setIsAuth={setIsAuth} isAuth={isAuth}/>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup setIsAuth={setIsAuth}/>}></Route>
      <Route path="/dashboard" element={<Dashboard setIsAuth={setIsAuth} isAuth={isAuth}/>}></Route>
    </Routes>
  );
}

export default App;
