import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NewClaimPage = () => {

    const [formData, setFormData] = useState({
        vehicleNumber: '',
        rcNumber: '',
        dlNumber: '',
        policyNumber: '',
        claimAmount: '',
        incidentDate: '',
        incidentLocation: '',
        incidentDescription: '',
        drivingLicense: null,
        rcCopy: null,
        vehicleImage1: null,
        vehicleImage2: null
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault()
        // Handle form submission logic here
        console.log('Form Data:', formData);
        // After submission, navigate back to dashboard or show a success message
        navigate('/dashboard/user');
    }


  return (

    <div className='bg-gray-100 min-h-screen p-6'>
    <div className="max-w-3xl mx-auto p-6 bg-white  space-y-6 mt-3 border rounded-2xl shadow-md">
        <h1 className="text-2xl font-semibold">Raise New Claim</h1>
        <p className="text-gray-500">Provide accurate details and required documents to initiate your claim.</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4 border">
            <h2 className="font-medium text-lg">Vehicle Details</h2>

            <div className=' flex gap-5'>
            <input type="text" placeholder="Vehicle Number" 
                value={formData.vehicleNumber}
                onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
            
                className=' h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />
            <input type="text" placeholder="RC Number"  
                value={formData.rcNumber}
                onChange={(e) => setFormData({ ...formData, rcNumber: e.target.value })}

                className=' h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />
            <input type="text" placeholder="DL Number "  
                value={formData.dlNumber}
                onChange={(e) => setFormData({ ...formData, dlNumber: e.target.value })}

                className=' h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />
            </div>
        
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h2 className="font-medium text-lg">Policy Details</h2>

            <div className=' flex gap-5'>
            <input type="text" placeholder="Policy Number"  
                value={formData.policyNumber}
                onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                className='  h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />

            <input type="number" placeholder="Claim Amount"  
                value={formData.claimAmount}
                onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                className='  h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />

            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h2 className="font-medium text-lg">Incident Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            
                <input type="date" className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
                placeholder='Incident Date'
                value={formData.incidentDate}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                />
            

                <input type="text" placeholder="Incident Location" className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
                value={formData.incidentLocation}
                onChange={(e) => setFormData({ ...formData, incidentLocation: e.target.value })}
                />

            </div>

                <textarea placeholder="Incident Description" rows="4" className="w-full h-24 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400"
                value={formData.incidentDescription}
                onChange={(e) => setFormData({ ...formData, incidentDescription: e.target.value })}
                ></textarea>

        </div>


        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h2 className="font-medium text-lg">Required Documents</h2>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Driving License (PDF/JPG/PNG, max 5MB)</label>
                <input type="file"
                value={formData.drivingLicense} 
                onChange={(e) => setFormData({ ...formData, drivingLicense: e.target.files[0] })}
                className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">RC Copy (PDF/JPG/PNG, max 5MB)</label>
                <input type="file" 
                value={formData.rcCopy}
                onChange={(e) => setFormData({ ...formData, rcCopy: e.target.files[0] })} className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Images (two images, JPG/PNG, max 5MB each)</label>
                <input type="file" multiple onChange={(e) => setFormData({ ...formData, vehicleImages: [...e.target.files] })} 
                value={formData.vehicleImage1}
                className="mt-1 block w-full text-sm text-gray-500" />
                <input type="file" multiple
                value={formData.vehicleImage2}
                onChange={(e) => setFormData({ ...formData, vehicleImages: [...e.target.files] })} className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
            onClick={handleSubmit}
            >
            Submit Claim
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => navigate(-1)}
            >
            Cancel
            </button>
            
        </div>
    </div>

    </div>

  )
}

export default NewClaimPage