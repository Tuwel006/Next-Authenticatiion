import Link from "next/link"
import { ReactNode } from "react"

const layout = ({children} : Readonly<{children: ReactNode}>) => {
  return (
    <>
    <div className="w-full h-12 flex justify-between items-center text-white bg-black px-4">
        <h1>Layout</h1>
      <ul className="flex justify-end gap-8 pr-4">
        <li>
            <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/contact'}>Contact</Link>
        </li>
      </ul>
      <div className="flex gap-2">
        <Link href={'/signup'} className="bg-cyan-600 px-4 py-1 rounded-md hover:bg-cyan-900">Sign Up</Link>
        <Link href={'/login'} className="bg-cyan-600 px-4 py-1 rounded-md hover:bg-cyan-900">Login</Link>
      </div>
    </div>
    {children}
    </>
  )
}

export default layout
