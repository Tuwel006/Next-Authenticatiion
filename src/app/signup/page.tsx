'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'
import { Button } from '@/components/ui/Button';

const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
    firstName: '',
    lastName: '',
    role: 'user'
  })
  const [buttonDisable, setButtonDissable] = useState(false);

  useEffect(() => {
    if(userData.userName && userData.email && userData.password && userData.confirm_password && userData.firstName && userData.lastName) {
      setButtonDissable(false);
    } else {
      setButtonDissable(true);
    }
  },[userData])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name : string = event.target.name;
    const value : string = event.target.value;
    setUserData((prev) => ({...prev, [name]: value}))
  }

  const [loading, setLoading] = useState(false)
   const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/users/signup', userData);
      console.log("User Signup Successfully..", res.data);
      router.push('/login');
    } catch (error: any) {
      toast.error("Signup failed ",error.message);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ProjectHub
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join thousands of teams already using ProjectHub</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={onSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  type="text" 
                  name="firstName" 
                  placeholder="First name" 
                  value={userData.firstName} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  type="text" 
                  name="lastName" 
                  placeholder="Last name" 
                  value={userData.lastName} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="text" 
                name="userName" 
                placeholder="Username" 
                value={userData.userName} 
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="email" 
                name="email" 
                placeholder="Email address" 
                value={userData.email} 
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={userData.password} 
                onChange={handleChange} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="password" 
                name="confirm_password" 
                placeholder="Confirm password" 
                value={userData.confirm_password} 
                onChange={handleChange} 
              />
            </div>
            
            <Button 
              type="submit"
              disabled={buttonDisable || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              size="lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link className="text-blue-600 hover:text-blue-800 font-medium transition-colors" href={'/login'}>
              Sign in
            </Link>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
