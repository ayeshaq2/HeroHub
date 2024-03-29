"use client"

import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from 'react';

import { FaBars, FaTimes } from "react-icons/fa";
const backPort = '3001'
const localhost= 'http://localhost:'


const Navbar=({toggle})=> {
  //creating a responsive navigation bar
  const [user, setUser] = useState(null)

  const[nav, setNav] = useState(false);

  useEffect(()=>{
    (
      async()=>{
        const response = await fetch(`${localhost}${backPort}/api/auth`, {
          credentials:'include'
        });
        const content = await response.json()
        setUser(content)
        //console.log(content)
      } 
    )()})

    const deleteCookie= (name)=>{
      const pastDate = new Date(0)
      document.cookie = `${name}=; expires=${pastDate.toUTCString()}; path=/login;`
    }

    const handleLogout = async()=>{
      try{
       
        const response = await fetch(`${localhost}${backPort}/logout`, {
          credentials:'include'
        })
        console.log(response)

        if(response.ok){
          //const pastDate = new Date(0)
          //document.cookie = `${name}=; expires=${pastDate.toUTCString()}; path=/login;`
          alert("You are logged out. Redirecting...")
          window.location.href='/'
        }else{
          console.error('Logout failed')
        }
      }catch(err){
        console.log("error lgout", err)
      }

      // deleteCookie('jwt');
      // alert("You are logged out. Redirecting...")
      // window.location.href='/'
    }
  

  return (
    <>
  <div className="w-full h-20 bg-black sticky top-0">
    <div className='container mx-auto px-4 h-full'>
        <div className='flex justify-between items-center h-full text-white'>
            <Link href='./homepage'>
              HeroHub
            </Link>
          

            <button type="button" className="inline-flex items-center md:hidden"
                onClick={toggle}>
                {/* Menu icon */}
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24">
                        <path fill="#fff"
                            d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/>
                    </svg>
                    </button>
            <ul className='hidden md:flex gap-x-6 text-white'>
                <li>
                  
                  {user && user.account==='admin'? `Hello Admin- ${user?.firstName}`: `Hello ${user?.firstName}`}

                </li>
                <li>
                  {user &&(
                    <Link href={user.account === 'admin'? "/admin": "/user-profile"}>
                      <p>Profile</p>
                </Link>)}
                    
                </li>
                <li>
                        {user? <p onClick={handleLogout} className='cursor-pointer'>Logout</p>:'' }
                </li>

                <li>
                    <Link href="/register">
                        {user? '': <p>Register</p>}
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                    {user? '': <p>Sign-in</p>}
                    </Link>
                </li>
                <div className='hidden md:block'>
                    {/* this is where the hamburger button appears */}
                
                </div>
            </ul>
        </div>
    </div>
  </div>
  </>
  )
}

export default Navbar;
//an example of a "card"
{/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a> */}
