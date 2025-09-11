import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../components/GoBackButton';

const UserClaimsPage = () => {
  const [claims, setClaims] = useState([]);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
 
  useEffect(() => {   

    console.log(user)

    const fetchPendingClaims = async () => {

        const toastId = toast.loading("Fetching pending claims...");

        const userId =  user.value.userId || user.value.value.userId ;
  
        try {
            const response = await fetch(`http://localhost:8080/api/claims/getUserClaims?userId=${userId}`,{
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
        <h1 className="text-2xl font-bold  ">Your Claims</h1>
        <GoBackButton/>
        </div>

        

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Vehicle No",  "Incident date", "Amount","Remarks", "Status"].map((header) => (
                  <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {claims.length > 0 ? (
                  claims.map((claim,idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{claim.vehicleNo}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{claim.incidentDate}</td>
                  
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 ">{claim.amount}</td>
                 
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 ">
                      {claim.remarks || "No remarks Given"}
                       </td>

                   <td> 
                  <div
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                            claim.status === "PENDING" ? "bg-yellow-600 text-white ring-yellow-600" :
                            claim.status === "REJECTED" ? "bg-red-600 text-white ring-red-600" :
                            claim.status === "APPROVED" ? "bg-green-600 text-white ring-green-600" : "bg-gray-600 text-white ring-gray-600"
                        }    `}
                  >

                        
                        
                        {claim.status}
                </div>
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

export default UserClaimsPage