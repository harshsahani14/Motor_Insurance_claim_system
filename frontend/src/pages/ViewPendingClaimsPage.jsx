import React, { use } from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';

const ViewPendingClaimsPage = () => {

  const [claims, setClaims] = useState([]);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
 
  useEffect(() => {   

    console.log(user)

    const fetchPendingClaims = async () => {

        const toastId = toast.loading("Fetching pending claims...");

        const approverId =  user.value.approverId || user.value.value.approverId ;
  
        try {
            const response = await fetch(`http://localhost:8080/api/claims/getApproverClaims?approverId=${approverId}`,{
                method: "GET",
            });
            const data = await response.json();

            console.log(data)
            setClaims(data.claims || []);


        } catch (error) {
            console.log('Error fetching pending claims:', error);
            toast.error("Error fetching pending claims");
        } finally {
            toast.dismiss(toastId);
        }
    }

    fetchPendingClaims(); 
  },[]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">

        <div className=' flex justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold  ">Pending Claims</h1>
        <GoBackButton path={"/dashboard/approver"} />
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Username", "Email", "Incident date", "Amount", "Action"].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {claims.length > 0 ? (
                  claims.map((claim) => (
                    <tr key={claim.claimId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {claim.user.name}
                      </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{claim.user.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{claim.incidentDate}</td>
                  
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 ">{claim.amount}</td>
                 
                  
                  <td className="px-4 py-3 whitespace-nowrap  text-sm font-medium">
                    <button 
                    onClick={()=> navigate(`/dashboard/approver/pending-claims/${claim.claimId}`,{
                      state: { claim }
                    })  }
                    className=" text-white bg-black hover:bg-gray-800 px-3 py-1 rounded-md">View</button>
                  </td>
                </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-center text-sm text-gray-500">
                    No pending claims found.
                  </td>
                </tr>
              )}
            
                </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewPendingClaimsPage