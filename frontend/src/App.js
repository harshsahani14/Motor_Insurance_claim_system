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
import { getLocalItem } from './localStorage'

const App = () => {

  const user = getLocalItem("user");
  const role = getLocalItem("role");

  const userState = useSelector((state) => state.user);
  const roleState = useSelector((state) => state.role);

  return (
    <div className=' '>

      <Routes>
      
      { (user || userState.value) ? (
          <>
            {role  === "ADMIN" && (
              <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            )}
            {role === "USER" && (
              <>
                <Route path="/dashboard/user" element={<UserDashboardPage />} />
                <Route path="/dashboard/user/newclaim" element={<NewClaimPage />} />
                <Route path="/dashboard/user/claims" element={<UserClaimsPage />} />
              </>
            )}
            {role === "APPROVER" && (
              <>
                <Route path="/dashboard/approver" element={<ApproverDashboardPage />} />
                <Route path="/dashboard/approver/pending-claims" element={<ViewPendingClaimsPage />} />
                <Route path="/dashboard/approver/pending-claims/:id" element={<ViewClaimPage />} />
              </>
            )}
            { console.log(userState)}

            <Route path="*" element={<NotFoundPage />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  )
}

export default App