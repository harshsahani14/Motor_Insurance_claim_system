import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeLocalItem } from '../localStorage.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../slices/userSlice.js';
import { updateRole } from '../slices/roleSlice.js';
import toast from 'react-hot-toast';

const LogoutButton = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {

        const toastId = toast.loading('Logging out...');

        dispatch(updateUser({value: null}));

        dispatch(updateRole({value: ''}));

        removeLocalItem('user');
        removeLocalItem('role');

        toast.dismiss(toastId);

        toast.success('Logged out successfully');
        window.location.href = '/login';
        
           
    }


  return (
    <button className="mb-4 px-4 py-2 bg-black text-white border rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300  "
    onClick={handleLogout}
    >
        Logout
    </button>
  )
}

export default LogoutButton