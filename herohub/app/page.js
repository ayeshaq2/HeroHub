"use client"
import { Input, Stack, Select, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Heading,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Image from 'next/image'
import Link from "next/link";
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import initializeTabs from './index' 


export default function Home() {
  //making page height greater than screen height to fit navbar

  //writing helper functions to toggle between tabs
  
  initializeTabs

 return( <>
  <div className='container mx-auto px-4'>
    <h1>Hello World</h1>
    <p>Page content</p>
    <div className='w-full h-40 bg-grey--800'></div>
    <Grid templateColumns='repeat(2)' gap={10}>
      <div className='flex justify-center items-center w-1/2'>
        {/* need to center items */}
        <input className="w-4/6 h-10 border border-gray-400 rounded-md focus:border-blue-50 focus:ring focus:ring-blue-300 focus:shadow-md transition duration-100 mx-5" variant='outline' placeholder='Search' />
        <select className="border border-gray-300 h-9 rounded-md w-3/6 max-w-screen-sm flex-1  text-blue-800 bg-gray-200 px-2" variant="filled" placeholder="Search by">
          <option value='name'>Name</option>
          <option value='race'>Race</option>
          <option value='publisher'>Publisher</option>
          <option value='Power'>Power</option>
        </select>

      </div>
    </Grid>
    {/**Creating tabs to switch between characters and lists */}
    <div className='mb-4 border-b border-gray-200 dark:border-gray-700 w-3/4 items-center justify-center'>
      <ul className='flex flex-wrap -mb-px text-sm font-medium text-center' id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li className='me-2' role="presentation">
          <button className='inline-block p-4 border-b-2 rounded-t-lg' id="characters-tab" data-tabs-target="#characters" type="button" role="tab" aria-controls="characters" aria-selected="false">Characters</button>
        </li>
        <li className='me-2' role="presentation">
          <button className='inline-block p-4 border-b-2 rounded-t-lg' id="lists-tab" data-tabs-target="#lists" type="button" role="tab" aria-controls="lists" aria-selected="false">Lists</button>
        </li>
      </ul>


      {/* <Tabs isFitted variant="soft-rounded" className="my-3 items-center justify-center">
        <TabList mb='1em' className="inline-flex flex-wrap justify-center bg-slate-100 rounded-100px p-1 mb-8">
          <Tab><button className='inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group pe-2.5'>Characters</button></Tab>
          
          <Tab className="mx-15 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">Lists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>cards go here</p>
          </TabPanel>
          <TabPanel>
            <p>list cards go here</p>
          </TabPanel>
        </TabPanels>
      </Tabs> */}

    </div>
    
    {/**Content for the lists */}
    <div id="default-tab-content">
      <div className='hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800' id="characters" role="tabpanel" aria-labelledby="characters-tab">
        <p className="text-sm text-gray-500 dark:text-gray-400">Bla bla bla -- cards go here</p>
      </div>
      <div className='hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800' id="lists" role="tabpanel" aria-labelledby="lists-tab">
        <p>Bla bla bla -- lists go here</p>
      </div>

    </div>
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg" id="characters-tab" data-tabs-target="#characters" type="button" role="tab" aria-controls="characters" aria-selected="false">Characters</button>
        </li>
        <li className="me-2" role="presentation">
            <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="lists-tab" data-tabs-target="#lists" type="button" role="tab" aria-controls="lists" aria-selected="false">Lists</button>
        </li>
        
    </ul>
</div>
  <div id="default-tab-content">
      <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="characters" role="tabpanel" aria-labelledby="characters-tab">
          <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div>
      <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="lists" role="tabpanel" aria-labelledby="lists-tab">
          <p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong className="font-medium text-gray-800 dark:text-white">tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
      </div>
      
    </div>

  </div>

   {/*building a card to display superhero results */}
   {/*Vertical Cards for superheroes*/}

   <SimpleGrid className="py-5 px-5" spacing={10} templateColumns='repeat(auto-fill, minmax(200px,1fr))'>
    <Card className="border border-indigo-400 flex flex-col-relative min-w-0 w-30 bg-white px-4 py-2 rounded-md">
      <CardHeader className="mb-4">
        <Heading size='md' className="text-blue-600 font-bold py-6 px-4">SuperHero Name</Heading>
      </CardHeader>
      <CardBody className="text-gray-700 px-4 py-5">
        <p>Publisher Name</p>
      </CardBody>
      <CardFooter className="align-right justify-right items-right">
        <button className='align-right bg-blue-500 text-white py-2 px-3 rounded-md text-sm'>View Information</button>
      </CardFooter>
    </Card>
    <Card className="border border-indigo-400 flex flex-col-relative min-w-0 w-30 bg-white px-4 py-2 rounded-md">
      <CardHeader className="mb-4">
        <Heading size='md' className="text-blue-600 font-bold py-6 px-4">SuperHero Name</Heading>
      </CardHeader>
      <CardBody className="text-gray-700 px-4 py-5">
        <p>Publisher Name</p>
      </CardBody>
      <CardFooter className="align-right justify-right items-right">
        <button className='align-right bg-blue-500 text-white py-2 px-3 rounded-md text-sm'>View Information</button>
      </CardFooter>
    </Card>
    <Card className="border border-indigo-400 flex flex-col-relative min-w-0 w-30 bg-white px-4 py-2 rounded-md">
      <CardHeader className="mb-4">
        <Heading size='md' className="text-blue-600 font-bold py-6 px-4">SuperHero Name</Heading>
      </CardHeader>
      <CardBody className="text-gray-700 px-4 py-5">
        <p>Publisher Name</p>
      </CardBody>
      <CardFooter className="align-right justify-right items-right">
        <button className='align-right bg-blue-500 text-white py-2 px-3 rounded-md text-sm'>View Information</button>
      </CardFooter>
    </Card>
    <Card className="border border-indigo-400 flex flex-col-relative min-w-0 w-30 bg-white px-4 py-2 rounded-md">
      <CardHeader className="mb-4">
        <Heading size='md' className="text-blue-600 font-bold py-6 px-4">SuperHero Name</Heading>
      </CardHeader>
      <CardBody className="text-gray-700 px-4 py-5">
        <p>Publisher Name</p>
      </CardBody>
      <CardFooter className="align-right justify-right items-right">
        <button className='align-right bg-blue-500 text-white py-2 px-3 rounded-md text-sm'>View Information</button>
      </CardFooter>
    </Card>
    

   </SimpleGrid>






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
