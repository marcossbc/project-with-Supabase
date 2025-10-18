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
import { AuthProvider } from './context/AuthContext'
import UnAuthCreatedRoute from './Component/UnAuthcreatedRoute'
import ManageArticalesPage from './Pages/manageArticalesPage'
import ProfilePage from './Pages/ProfilePage'

function App() {


  return (
    < AuthProvider>
      <div className=''>
        {/* header */}
        <Header />
        <main>
          {/* routers */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/articles' element={<Articales />} />
            <Route path='/article/:id' element={<Articale />} />

            {/* home page loggin */}
            <Route path="/signUp" element=
              {
                <UnAuthCreatedRoute>
                  <SignUp />

                </UnAuthCreatedRoute>

              } />
            <Route path="/signIn" element={
              <UnAuthCreatedRoute>
                <SignIn />
              </UnAuthCreatedRoute>

            } />

            <Route path='/editor' element={< ArticleEditorPage />}>
            </Route>
            <Route path='/editor/:id' element={< ArticleEditorPage />}>
            </Route>
            <Route path='/manage-articales' element={<ManageArticalesPage />}>
            </Route>
            <Route path='/Profile-Page' element={<ProfilePage />}>
            </Route>


          </Routes>
        </main>
        {/* footer */}
        <Footer />
        {/* <Outlet/> */}
      </div>
    </AuthProvider>
  )
}

export default App
