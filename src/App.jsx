import { useEffect, useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Container from 'react-bootstrap/Container'
import axios from 'axios'

import LandingPage from './pages/Landing'
import LoginPage from './pages/Login'

import AppNavbar from './components/AppNavbar'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    getCurrentUser()
  }, [])

  async function getCurrentUser() {
    try {
      const API_URL = import.meta.env.VITE_API_URL
      const res = await axios.get(`${API_URL}/users/current-user`)
      setCurrentUser(res.data.user)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  }

  return (
    <BrowserRouter>
      <AppNavbar 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
      />
      <Container>
        <Routes>
          <Route path='/' element={
            currentUser ? (
              <LandingPage />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path='/login' 
            element={
              <LoginPage 
                setCurrentUser={setCurrentUser} 
              />
            } 
          />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
