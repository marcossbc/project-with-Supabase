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
import ProtectedRoute from './Component/ProtectedRoute'
import ArticleEditorPage from './Pages/ArticleEditorPage'

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
            <Route path="/signUp" element={
              <UnAuthCreatedRoute>
                <SignUp />
              </UnAuthCreatedRoute>

            } />
            <Route path="/signIn" element={
              <UnAuthCreatedRoute>
                <SignIn />
              </UnAuthCreatedRoute>

            } />

            <Route path='/editor' element={
              <ProtectedRoute>
                < ArticleEditorPage />
              </ProtectedRoute>

            }>
            </Route>
            <Route path='/editor/:id' element={
              <ProtectedRoute>
                < ArticleEditorPage />
              </ProtectedRoute>

            }
            />
            <Route path='/manage-articales' element={
              <ProtectedRoute>
                <ManageArticalesPage />
              </ProtectedRoute>

            }
            />
            <Route path='/profile' element={
              <ProtectedRoute>
                <ProfilePage />

              </ProtectedRoute>
              
            }
            />


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
