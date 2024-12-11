import React, { useState } from 'react'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import NavBar  from './Components/NavBar.jsx'
import Home from './Components/Home.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Signin from './Components/Signin.jsx'
import Signup from './Components/Signup.jsx'


export default function App() {
  const Login = localStorage.getItem("Login");
  const [isAuthenticated, setIsAuthenticated] = useState(Login);
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path='/dashboard' element={<Dashboard />}  />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
