"use client"
import React, {useEffect, useState} from 'react'
import { Input, Stack, Select, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Heading,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
//import Image from 'next/image'
//import Link from "next/link";
//import { FaBars, FaTimes } from "react-icons/fa";
import Search from '../components/search/Search'
import Lists from '../components/Lists/Lists'
import Navigation from "../components/navigation/page"
const backPort = '3001'


export default function Home() {
  const [ListForm, setShowListForm] = useState(false)
  const [message, setMessage] = useState("loading")
  
 
 return( <>
 <Navigation />
 {/* adding div background*/}
 <div className='relative h-80 sm:h-96'>
 <div style={{backgroundImage: "url('comicCover.png')", backgroundSize: "100% 100%", backgroundPosition:"center", boxShadow:"0 4px 6px rgba(80, 80, 80, 0.1)" }}className='absolute inset-0  h-full  w-full bg-cover bg-center sm:bg-auto sm:bg-contain sm:h-96 py-5 bg-gray-800 relative'>
      <div className='absolute inset-0 bg-black opacity-50'>
      </div>
    </div>
 </div>

 {/**Creating tabs to switch between characters and lists */}
 <div className='relative mb-4 border-b border-gray-200 dark:border-gray-700 w-full justify-center'>
     
  <Tabs isFitted variant="soft-rounded" className=" my-3 ">
    <TabList mb='1em' className=" text-white inline-flex flex-wrap justify-center bg-black rounded-100px p-1 mb-8">
          <Tab><button className='p-4 px-4 border-b-2 bg-red-700 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-2.5'>Characters</button></Tab>
          
          <Tab className="mx-15  p-4 border-b-2 border-transparent rounded-t-lg text-white hover:border-gray-300 dark:hover:text-gray-300 group">Lists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>cards go here</p>
            {/**put the search component here */}
            <Search />
                </TabPanel>
                <TabPanel>
                  <p>list cards go here</p>
                  <Lists />
                  {/**put list components here */}
                </TabPanel>
              </TabPanels>
            </Tabs>

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
