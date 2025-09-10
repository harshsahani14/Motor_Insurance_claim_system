import React, { use, useEffect } from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import DropDownComponent from '../components/DropDownComponent';
import LogoutButton from '../components/LogoutButton';

const AdminDashboardPage = () => {
  const [approvers, setApprovers] = useState([]);

  
  const handleLevelChange = async(email, newLevel) => {
    
    const toastId = toast.loading("Updating level...");

    try {
        const response = await fetch('http://localhost:8080/api/admin/assign', {
            method: "PUT",
            headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    level: newLevel
                })
        });

        toast.dismiss(toastId);

        toast.success("Approver level updated successfully");

    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Failed to update approver level");
    }
    
  };


  useEffect(() => { 
    
    const fetchApprovers = async () => {

        const toastId = toast.loading("Fetching approvers...");
        try {
            const response = await fetch('http://localhost:8080/api/admin/getApprovers',{
                method: "GET",
            });
            
            const data = await response.json();
            setApprovers(data.approvers || []);
            toast.dismiss(toastId);
        } catch (error) {
            console.log('Error fetching approvers:', error);
            toast.dismiss(toastId);
            toast.error("Failed to fetch approvers");
        }
    }
        fetchApprovers();
    }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 ">

        <div className=' flex justify-between items-center mb-8'>

            <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <LogoutButton />
        </div>
      <div className="max-w-5xl mx-auto">
        
        
        <p className=' text-gray-500 mb-5 '> Assign levels to approvers</p>

        <div className="overflow-x-auto rounded-lg shadow overflow-y-visiblevisible   bg-white z-10">

            {
                approvers.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Current Level</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {approvers.map((approver) => (
                                <tr
                                key={approver.approverId}
                                className="border-b hover:bg-gray-50 transition  "
                                >
                                <td className="px-6 py-4 ">{approver.name}</td>
                                <td className="px-6 py-4  ">{approver.email}</td>
                                <td className="px-6 py-4 ">{approver.level || "Not Assigned"}</td>
                                <td className="px-6 py-4 text-right">
                                    <DropDownComponent
                                        onChange={(newLevel) => {
                                            handleLevelChange(approver.email, newLevel);
                                            setApprovers((prevApprovers) =>
                                                prevApprovers.map((a) =>
                                                    a.email === approver.email ? { ...a, level: newLevel } : a
                                                )
                                            );
                                        }}
                                        array={["ONE", "TWO", "THREE"]}
                                        label="level"
                                    >

                                    </DropDownComponent>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                    </table>
                ) : 
                ( 
                    <div className="p-6 text-center">
                        <p className=" text-gray-500">No approvers found.</p>
                    </div>
                 )
                 
            }
          
        </div>
      </div>
    </div>

            )
}

export default AdminDashboardPage