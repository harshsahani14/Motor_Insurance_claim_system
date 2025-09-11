import React from 'react'
import * as EmailValidator from 'email-validator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DropDownComponent from '../components/DropDownComponent';

const SignUpPage = () => {

    const [form , setForm] = React.useState({
        name : "",
        email : "",
        password : "",
        role : "",
        address : "",
        contact : ""
    })

    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        
        e.preventDefault();

        if(form.name === "" || form.email === "" || form.password === "" || form.role === "" || form.address === ""){
            toast.error("Please fill all the fields");
            return;
        }

        if(!EmailValidator.validate(form.email)){
            toast.error("Please enter a valid email");
            return;
        }

        if(form.password.length < 6){
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if(form.contact.length < 10){
            toast.error("Please enter a valid contact number");
            return;
        }

        const loadingToast = toast.loading("Creating your account...");

        try {
            const response = await fetch(`http://localhost:8080/api/signup/${form.role === "Approver" ? "approver" : "user"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if(response.status === 200){
                toast.success("Account created successfully");
            }

            if(response.status === 500){
                const data = await response.json();
                toast.error(data.message || "Something went wrong");
                return;
            }

            navigate('/login');
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            toast.dismiss(loadingToast);
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Sign up to raise claims or review approvals.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 ">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-black  "
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Password (must be at least 6 characters)</label>
            <input
              type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                minLength={6}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-black focus:ring-black"
              required
            />
          </div>


        <div className="mt-4 flex flex-col gap-1">
          <div className='block text-sm font-medium text-gray-900'> Role </div>
          <DropDownComponent
          onChange={(value) => setForm({...form, role: value})}
          array={["User", "Approver"]}
          label="role"
          />
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Contact</label>
            
              <input
                type="text"
                placeholder="Enter your contact number"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="rounded-lg border w-full mt-1 border-gray-300 p-2 text-sm focus:border-black focus:ring-black "
                required
              />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Address</label>

              <input
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="rounded-lg border w-full mt-1 border-gray-300 p-2 text-sm focus:border-black focus:ring-black "
                required
                placeholder="Enter your address"
                value={form.address}
              />
          </div>



          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800"
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-sm text-blue-600 text-center">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage