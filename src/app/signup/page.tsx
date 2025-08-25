'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from 'axios'

const Signup = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    confirm_password: '',
  })
  const [buttonDisable, setButtonDissable] = useState(false);

  useEffect(() => {
    if(userData.userName && userData.email && userData.password && userData.confirm_password) {
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
    <div className="h-screen w-full flex justify-center flex-col items-center bg-cyan-50">
        <h1 className="text-2xl my-10">Signup Page</h1>
      <div className="bg-gray-250 flex flex-col p-4 rounded-md shadow-lg shadow-gray-900">
        <form className="flex flex-col gap-8 m-2" onSubmit={onSignup}>
        <input className="px-2 border-[1px] border-cyan-600" type="text" name="userName" placeholder="Enter User Name.." value={userData.userName} onChange={handleChange} />
        <input className="px-2 border-[1px] border-cyan-600" type="email" name="email" placeholder="Enter Email.." value={userData.email} onChange={handleChange} />
        <input className="px-2 border-[1px] border-cyan-600" type="password" name="password" placeholder="Enter password.." value={userData.password} onChange={handleChange} />
        <input className="px-2 border-[1px] border-cyan-600" type="password" name="confirm_password" placeholder="Enter Confirm Password.." value={userData.confirm_password} onChange={handleChange} />
        <button disabled={buttonDisable} className={`${!buttonDisable? "bg-cyan-700 cursor-pointer hover:bg-cyan-900" : "bg-gray-400"}`}>{loading? "Processing.." : "Sign Up"}</button>
      </form>
      <span className="text-center">No Account <Link className="text-blue-600 hover:text-blue-900" href={'/login'}>Login</Link></span>
      </div>
    </div>
  )
}

export default Signup
