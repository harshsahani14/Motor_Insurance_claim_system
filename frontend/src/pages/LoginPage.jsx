import React from 'react'
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../slices/userSlice.js';
import { updateRole } from '../slices/roleSlice.js';

const LoginPage = () => {

    const [form, setForm] = useState({
        "email": "",
        "password": "",
        "role": ""
    })

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(form.email === "" || form.password === ""){
            toast.error("Please fill all the fields");
            return;
        }

        if(!EmailValidator.validate(form.email)){
            toast.error("Please enter a valid email");
            return;
        }

        const loadingToast = toast.loading("Logging in...");

        try{

            const response = await fetch(`http://localhost:8080/api/signin/${form.role === "Admin" ? "admin" : form.role === "Approver" ? "approver" : "user"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            })

            if(response.status === 400){
                toast.error("Invalid credentials");
                return;
            }

            const data = await response.json();

            dispatch(updateUser(data.user));
            dispatch(updateRole(data.role));

            toast.success("Logged in successfully");

            navigate(`/dashboard/${data.role.toLowerCase()}`)
        }
        catch(error){
            toast.error("Something went wrong");
        }   
        finally{    
            toast.dismiss(loadingToast);
        }
    }
  return (
     
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Log in to access your role-based dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e)=> setForm({...form,email: e.target.value})}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
              onClick={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="User">User</option>
              <option value="Approver">Approver</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(e)=> setForm({...form,password: e.target.value})}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-blue-500">
          Need an account?{" "}
          <a href="/signup" className=" hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage