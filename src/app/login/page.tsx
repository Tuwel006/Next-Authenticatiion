'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
          alert(res);
          router.push('/profile');
        } catch (error) {
          console.log(error);
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
    <div className="h-screen w-full flex justify-center flex-col items-center bg-cyan-50">
      <h1 className="text-2xl my-10">Login Page</h1>
      <form className="bg-gray-250 flex flex-col p-4 gap-8 rounded-md shadow-lg shadow-gray-900" onSubmit={onLogin} action="">
        <input className="px-2 border-[1px] border-cyan-600" type="email" placeholder="Enter Email.." value={userData.email} onChange={(e) => setUserData((prev) => ({...prev, email: e.target.value}))} />
        <input className="px-2 border-[1px] border-cyan-600" type="password" placeholder="Enter password.." value={userData.password} onChange={(e) => setUserData((prev) => ({...prev, password: e.target.value}))} />
        <button disabled={buttonDisable} className="bg-cyan-700 cursor-pointer hover:bg-cyan-900">{loading?"Processing.." : "Login"}</button>
        <span className="text-center">Already have an Account <Link className="text-blue-600 hover:text-blue-900" href={'/signup'}>Sign Up</Link></span>
      </form>
    </div>
  )
}

export default Login
