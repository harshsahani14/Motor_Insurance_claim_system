import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

const App = () => {

  return (
    <div className=' '>

      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
      </Routes>
    </div>
  )
}

export default App