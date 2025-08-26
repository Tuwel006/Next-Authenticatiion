'use client'
import axios from "axios"
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({children}: Readonly<{children: ReactNode}> ) => {
    const router = useRouter();
    const onLogout = async () => {
        try {
            confirm("Do you Want to Logout..");
            const response = await axios.get('/api/users/logout');
            alert(response.data);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div className="h-15 w-full bg-gray-500 flex justify-between items-center">
        <h1 className="text-2xl text-white p-4">Profile Layout</h1>
        <div>
            <button className="m-6 bg-cyan-100 p-1 rounded-md cursor-pointer" onClick={onLogout}>Logout</button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Layout
