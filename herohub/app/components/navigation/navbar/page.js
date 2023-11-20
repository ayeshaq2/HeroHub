"use client"

import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";



const Navbar=({toggle})=> {
  //creating a responsive navigation bar

  const[nav, setNav] = useState(false);
  const links = [
    {
      id:1,
      link: "home",
    }, {
      id:2,
      link: "resgister",
    },{
      id:3,
      link:"sign-in",
    }]

  return (
    <>
  <div className="w-full h-20 bg-black sticky top-0">
    <div className='container mx-auto px-4 h-full'>
        <div className='flex justify-between items-center h-full text-white'>
            HeroHub
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
                    <Link href="/register">
                        <p>Register</p>
                    </Link>
                </li>
                <li>
                    <Link href="/sign-in">
                        <p>Sign in</p>
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
