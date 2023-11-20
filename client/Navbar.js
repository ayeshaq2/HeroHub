"use client"

import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import "./globals.css"


const Navbar=()=> {
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

  return (<div className='navbar-div'>
    <div>
      <h1 className='heading'>
        <a className='link-home'
            href=""
            target="_blank"
            rel="none">HeroHub</a>
      </h1>
    </div>

    {/* /* looping over the items */}
    <ul className='navbar-items'>
      {links.map(({id, link})=>(
        <li 
            key={id}
            className='nav-link'><Link href={link}>{link}</Link></li>
      ))}
    
  </ul>

  <div onClick={()=> setNav(!nav)}
  className='click-navbar'>
    {nav?<FaTimes size={30}/> : <FaBars size={30}/>}
  </div>

  {nav && (
    <ul className='top-center-nav'>
      {links.map(({id,link})=>(
        <li
        key={id}
        className='navbar-items'>
          <Link onClick={()=> setNav(!nav)} href={link}>{link}</Link>
        </li>
      ))}
    </ul>
  )}
  </div>
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
