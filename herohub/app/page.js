"use client"

import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";


export default function Home() {
  //making page height greater than screen height to fit navbar
 return( <>
  <div className='container mx-auto px-4'>
    <h1>Hello World</h1>
    <p>Page content</p>
    <div className='w-full h-screen bg-grey--300'></div>
    <p>
      dummry text
    </p>

  </div>
  </>

 )
}


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
