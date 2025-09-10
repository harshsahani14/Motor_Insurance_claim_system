import React, { use } from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import UserDashboardPage from './pages/UserDashboardPage'
import NewClaimPage from './pages/NewClaimPage'
import ApproverDashboardPage from './pages/ApproverDashboardPage'
import { useSelector } from 'react-redux'
import NotFoundPage from './pages/NotFoundPage'
import { Navigate } from 'react-router-dom'
import ViewPendingClaimsPage from './pages/ViewPendingClaimsPage'
import ViewClaimPage from './pages/ViewClaimPage'
import UserClaimsPage from './pages/UserClaimsPage'

const App = () => {

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);

  return (
    <div className=' '>

      <Routes>
      
      { user.value && role.value  ? (
          <>
            { role.value  === "ADMIN" || role.value.value === "ADMIN" ? (
              <>
                <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
              </>
            ) :role.value === "USER" || role.value.value === "USER" ? (
              <>
                <Route path="/dashboard/user" element={<UserDashboardPage />} />
                <Route path="/dashboard/user/newclaim" element={<NewClaimPage />} />
                <Route path="/dashboard/user/myclaims" element={<UserClaimsPage />} />
              </>
            ) :  role.value === "APPROVER" || role.value.value === "APPROVER" ? (
              <>
                <Route path="/dashboard/approver" element={<ApproverDashboardPage />} />
                <Route path="/dashboard/approver/pending-claims" element={<ViewPendingClaimsPage />} />
                <Route path="/dashboard/approver/pending-claims/:id" element={<ViewClaimPage />} />
              </>
            ) : (
              null
            )
            }
          
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login"  replace />} />
          </>
        )}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App