'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false);
    const [buttonDisable, setButtonDissable] = useState(false);
    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          setLoading(true);
          const res = await axios.post('/api/users/login', userData);
          toast.success('Login successful!');
          router.push('/dashboard');
        } catch (error: any) {
          toast.error(error.response?.data?.error || 'Login failed');
        }
        finally{
          setLoading(false);
        }
    }

    useEffect(() => {
      if(userData.email && userData.password) {
        setButtonDissable(false)
      } else {
        setButtonDissable(true);
      }
    }, [userData])

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
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue to your dashboard</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={onLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="email" 
                placeholder="Enter your email" 
                value={userData.email} 
                onChange={(e) => setUserData((prev) => ({...prev, email: e.target.value}))} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                type="password" 
                placeholder="Enter your password" 
                value={userData.password} 
                onChange={(e) => setUserData((prev) => ({...prev, password: e.target.value}))} 
              />
            </div>
            
            <Button 
              type="submit"
              disabled={buttonDisable || loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              size="lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link className="text-blue-600 hover:text-blue-800 font-medium transition-colors" href={'/signup'}>
              Sign up
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
