import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignUp from './pages/SignUp'



import Login from './pages/Login'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import ProtectedRoutes from './pages/ProtectedRoutes'
import { AuthProvider } from './pages/AuthContext'
import UserProfile from './pages/UserProfile'



function App() {
  return (
    <div>
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home/>}/> 
     <Route path='/signup' element={<SignUp />}/> 
     <Route path='/login' element={<Login/>}/> 
     <Route path='/profile' element={<UserProfile/>}/>
     <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

     
      </Routes>
      </AuthProvider>
      </Router>
      
      
      

    </div>
  )
}

export default App