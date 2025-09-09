import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeLocalItem } from '../localStorage.js';

const UserDashboardPage = () => {


    const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

        <div className=' flex justify-between items-center mb-8 flex-row-reverse'>
        <button className="mb-4 px-4 py-2 bg-black text-white border rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300  ">
            Logout
        </button>
            <h1 className="text-2xl font-semibold ">User Dashboard</h1>
            
        </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-medium mb-2">Raise a Claim</h2>
                <p className="text-sm text-gray-500 mb-4">Create a new reimbursement or expense claim.</p>
                <button className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={() => navigate('/dashboard/user/newclaim')}>
                    New Claim
                </button>
                </div>

    
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-medium mb-2">Track Status</h2>
            <p className="text-sm text-gray-500 mb-4">View all your claims and their current status.</p>
            <button 
            onClick={() => {
                navigate('/dashboard/user/myclaims')
            }}
            className="px-4 py-2 bg-white border border-gray-200 text-sm rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
                My Claims
            </button>
            </div>
        </div>
    </div>

  )
}

export default UserDashboardPage