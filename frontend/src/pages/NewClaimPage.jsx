import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const NewClaimPage = () => {

    const [formData, setFormData] = useState({
        vehicleNo: '',
        rcNo: '',
        dlNo: '',
        policyNo: '',
        amount: '',
        incidentDate: '',
        incidentLocation: '',
        incidentDetails: '',
        dlImage: null,
        rcImage: null,
        vehicleImage1: null,
        vehicleImage2: null
    });

    const navigate = useNavigate();

    const user = useSelector((state) => state.user);


    const handleSubmit = async (e) => {

        e.preventDefault()

        console.log(user)

        if(!formData.vehicleNo || !formData.rcNo || !formData.dlNo || !formData.policyNo || !formData.amount || !formData.incidentDate || !formData.incidentLocation || !formData.incidentDetails || !formData.dlImage || !formData.rcImage || !formData.vehicleImage1 || !formData.vehicleImage2){
            console.log(formData)
            toast.error("Please fill all the fields")
            return;
        }

        if(isNaN(formData.amount) || formData.amount <= 0){
            toast.error("Please enter a valid claim amount")
            return;
        }

        if(formData.incidentDate > new Date().toISOString().split("T")[0]){
            toast.error("Incident date cannot be in the future")
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

        const maxSize = 5 * 1024 * 1024; // 5MB

        if(!allowedTypes.includes(formData.dlImage.type)){
            toast.error("Driving License must be a JPG, PNG or PDF file")
            return;
        }

        if(!allowedTypes.includes(formData.rcImage.type)){
            toast.error("RC Copy must be a JPG, PNG or PDF file")
            return;
        }

        if(!allowedTypes.includes(formData.vehicleImage1.type)){
            toast.error("Vehicle Image 1 must be a JPG, PNG or PDF file")
            return;
        }

        if(!allowedTypes.includes(formData.vehicleImage2.type)){
            toast.error("Vehicle Image 2 must be a JPG, PNG or PDF file")
            return;
        }

        if(formData.dlImage.size > maxSize || formData.rcImage.size > maxSize || formData.vehicleImage1.size > maxSize || formData.vehicleImage2.size > maxSize){
            toast.error("File size should be less than 5MB")
            return;
        }

        const toastId = toast.loading("Submitting your claim...")

        const formDatatoSend = new FormData();

            formDatatoSend.append('userId', user.value.userId);
            formDatatoSend.append('vehicleNo', formData.vehicleNo);
            formDatatoSend.append('rcNo', formData.rcNo);
            formDatatoSend.append('dlNo', formData.dlNo);
            formDatatoSend.append('policyNo', formData.policyNo);
            formDatatoSend.append('amount', formData.amount);
            formDatatoSend.append('incidentDate', formData.incidentDate);
            formDatatoSend.append('incidentLocation', formData.incidentLocation);
            formDatatoSend.append('incidentDetails', formData.incidentDetails);
            formDatatoSend.append('dlImage', formData.dlImage);
            formDatatoSend.append('rcImage', formData.rcImage);
            formDatatoSend.append('vehicleImage1', formData.vehicleImage1);
            formDatatoSend.append('vehicleImage2', formData.vehicleImage2);

        try {
            
            const response = await fetch('http://localhost:8080/api/claims/raiseClaim', {
                method: 'POST',
                body: formDatatoSend,
            })

            if(response.status === 200){
                toast.dismiss(toastId)
                toast.success("Claim submitted successfully")
                navigate('/dashboard/user')
            }

        } catch (error) {
            console.log(error)
            toast.dismiss(toastId)
            toast.error("Failed to submit claim")
        }
        
        

    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
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
                value={formData.vehicleNo}
                onChange={(e) => setFormData({ ...formData, vehicleNo: e.target.value })}
            
                className=' h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />
            <input type="text" placeholder="RC Number"  
                value={formData.rcNo}
                onChange={(e) => setFormData({ ...formData, rcNo: e.target.value })}

                className=' h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />
            <input type="text" placeholder="DL Number "  
                value={formData.dlNo}
                onChange={(e) => setFormData({ ...formData, dlNo: e.target.value })}

                className=' h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />
            </div>
        
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h2 className="font-medium text-lg">Policy Details</h2>

            <div className=' flex gap-5'>
            <input type="text" placeholder="Policy Number"  
                value={formData.policyNo}
                onChange={(e) => setFormData({ ...formData, policyNo: e.target.value })}
                className='  h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder-gray-400'
            />

            <input type="text" placeholder="Claim Amount"  
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
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
                value={formData.incidentDetails}
                onChange={(e) => setFormData({ ...formData, incidentDetails: e.target.value })}
                ></textarea>

        </div>


        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <h2 className="font-medium text-lg">Required Documents</h2>
            <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Driving License (PDF/JPG/PNG, max 5MB)</label>
                <input type="file"
                name='dlImage'
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">RC Copy (PDF/JPG/PNG, max 5MB)</label>
                <input type="file"
                name='rcImage'
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle Images (two images, JPG/PNG, max 5MB each)</label>
                <input type="file" multiple onChange={handleFileChange} 
                accept='.jpg,.png,.pdf'
                name='vehicleImage1'
                className="mt-1 block w-full text-sm text-gray-500" />
                <input type="file" multiple
                name='vehicleImage2'
                accept=".jpg,.png,.pdf"
                onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500" />
            </div>
            </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
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