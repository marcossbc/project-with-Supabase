// import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Articale from './Pages/Articale'
import Articales from './Pages/Articales'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Footer from './Component/Footer'
import Header from './Component/Header'

function App() {


  return (
    <div className=''>
     {/* header */}
     <Header/>
     <main>
      {/* routers */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/articles' element={<Articales/>} />
        <Route path='/article/:id' element={<Articale/>} />

        {/* home page loggin */}
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
          
        
      </Routes>
     </main>
     {/* footer */}
     <Footer/>
     {/* <Outlet/> */}
    </div>
  )
}

export default App
