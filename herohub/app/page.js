"use client"
import { Input, Stack, Select, Grid, GridItem } from '@chakra-ui/react'

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
    <div className='w-full h-40 bg-grey--800'></div>
    <Grid templateColumns='repeat(2)' gap={10}>
      <div className='flex justify-center items-center w-1/2'>
        {/* need to center items */}
        <input className="w-4/5 h-10 border border-gray-400 rounded-md focus:border-blue-50 focus:ring focus:ring-blue-300 focus:shadow-md transition duration-100 mx-5" variant='outline' placeholder='Search' />
        <select className=" border border-gray-300 h-9 rounded-md w-1/5 max-w-screen-sm flex-1  text-blue-800 bg-gray-200 px-2" variant="filled" placeholder="Search by">
          <option value='name'>Name</option>
          <option value='race'>Race</option>
          <option value='publisher'>Publisher</option>
          <option value='Power'>Power</option>
        </select>

      </div>
    </Grid>

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
