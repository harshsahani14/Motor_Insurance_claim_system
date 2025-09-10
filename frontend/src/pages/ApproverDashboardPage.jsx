import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton';


const ApproverDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

        <div className=' flex justify-between items-center mb-8 flex-row-reverse'>
        <LogoutButton />
            <h1 className="text-2xl font-semibold ">Approver Dashboard</h1>
            
        </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-medium mb-2">Pending Approvals</h2>
                <p className="text-sm text-gray-500 mb-4">Review and approve/reject pending claims.</p>
                <button className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => navigate('/dashboard/approver/pending-claims')}>
                    Open Approvals
                </button>
                </div>

    
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-medium mb-2">Guideline</h2>
            <p className="text-sm text-gray-500 mb-4">Ensure consistent decisions and fair outcomes.</p>
            <div className=" py-2  text-sm  ">
                Only claims with complete details should be approved.
            </div>
            </div>
        </div>
    </div>
  )
}

export default ApproverDashboardPage