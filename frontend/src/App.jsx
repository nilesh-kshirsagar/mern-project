import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App