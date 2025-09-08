import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UserDashboardPage from './pages/UserDashboardPage'
import NewClaimPage from './pages/NewClaimPage'

const App = () => {

  return (
    <div className=' '>

      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="/dashboard/user" element={<UserDashboardPage />} />
        <Route path="/dashboard/user/newclaim" element={<NewClaimPage />} />

      </Routes>
    </div>
  )
}

export default App