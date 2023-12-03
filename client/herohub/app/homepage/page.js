"use client"
import React, {useEffect, useState} from 'react'
import { Input, Stack, Select, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Heading,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import MPopover from "../components/popover/MPopover"

import Image from 'next/image'
import Link from "next/link";

import { FaBars, FaTimes } from "react-icons/fa";
import initializeTabs from '../index' 
import { useStyleRegistry } from 'styled-jsx'
const backPort = '3001'


export default function Home() {
  const [message, setMessage] = useState("loading")
  const [heroes, setHeroes] = useState([]) //for the searching superheroes
  const [searchOption, setSeaarchOption] = useState('name') //search option 



  // useEffect(()=>{
  //   fetch(`http://localhost:${backPort}/api/home`).then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       console.log(data)
  //       setMessage(data.message)
  //     }
  //   )
  // })

  const searchVal = document.getElementById("search")
  const searchbtn = document.getElementById('searchBtn')
  const searchOpt = document.getElementById("searchOption")

   
  //fetch for the search option


  const fetchdata =async ()=>{
    try{
      const response = await fetch(`http://localhost:${backPort}/search/${searchOpt.value}/${searchVal.value}`)
      const data = await response.json()

      if(Array.isArray(data.data)){
        setHeroes(data.data)
      }else{
        setHeroes([data.data])
      }
      console.log(heroes.flat())
    }catch(error){
      console.error('Error:', error)
    };}

  useEffect(()=>{
    
    fetchdata();
    console.log(heroes)
  }, [searchOpt?.value,searchVal?.value])

  const handleSearchClick = () =>{
    fetchdata();
  }





 return( <>
 {/* <div>{message}</div> */}
 <div className='relative h-80 sm:h-96'>
 <div style={{backgroundImage: "url('comicCover.png')", backgroundSize: "100% 100%", backgroundPosition:"center", boxShadow:"0 4px 6px rgba(80, 80, 80, 0.1)" }}className='absolute inset-0  h-full  w-full bg-cover bg-center sm:bg-auto sm:bg-contain sm:h-96 py-5 bg-gray-800 relative'>
      <div className='absolute inset-0 bg-black opacity-50'>

      </div>
    </div>

 </div>

 {/**Creating tabs to switch between characters and lists */}
 <div className='relative mb-4 border-b border-gray-200 dark:border-gray-700 w-full justify-center'>
      {/* <ul className='flex flex-wrap -mb-px text-sm font-medium text-center' id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li className='me-2' role="presentation">
          <button className='inline-block p-4 border-b-2 rounded-t-lg' id="characters-tab" data-tabs-target="#characters" type="button" role="tab" aria-controls="characters" aria-selected="false">Characters</button>
        </li>
        <li className='me-2' role="presentation">
          <button className='inline-block p-4 border-b-2 rounded-t-lg' id="lists-tab" data-tabs-target="#lists" type="button" role="tab" aria-controls="lists" aria-selected="false">Lists</button>
        </li>
      </ul> */}


  <Tabs isFitted variant="soft-rounded" className=" my-3 ">
    <TabList mb='1em' className=" text-white inline-flex flex-wrap justify-center bg-black rounded-100px p-1 mb-8">
          <Tab><button className='p-4 px-4 border-b-2 bg-red-700 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-2.5'>Characters</button></Tab>
          
          <Tab className="mx-15  p-4 border-b-2 border-transparent rounded-t-lg text-white hover:border-gray-300 dark:hover:text-gray-300 group">Lists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>cards go here</p>
            <div className='container mx-auto px-4 relative justify-center w-4/5'>
              <Grid templateColumns='repeat(2)' gap={10}>
                <div className='inline-flex items-center py-4'>
                        {/* need to center items */}
                <input id="search" className="w-4/6 h-10 border border-gray-400 rounded-md focus:border-red-50 focus:ring focus:ring-red-300 focus:shadow-md transition duration-100 mx-5" variant='outline' placeholder='Search' />
                  <select id='searchOption' className="px-4 border border-gray-300 h-9 rounded-md w-3/6 max-w-screen-sm flex-1  text-red-800 bg-gray-200 px-2" variant="filled" placeholder="Search by">
                    <option value='Name'>Name</option>
                    <option value='Race'>Race</option>
                    <option value='Publisher'>Publisher</option>
                    <option value='Power'>Power</option>
                  </select>
                    <button id='searchBtn' onClick={handleSearchClick} className='align-right bg-red-700 text-white py-2 px-4 rounded-md text-sm'>search</button>

                </div>
              </Grid>
  </div>
  
  {/*building a card to display superhero results */}
   {/*Vertical Cards for superheroes*/}
            
    <div className='w-3/4 relative justify-center mx-auto'>
          <SimpleGrid className="py-5 px-5 " spacing={10} templateColumns='repeat(auto-fill, minmax(200px,1fr))'>
            {heroes.map((hero)=>(
              <Card key={hero.id} className="border border-red-800 flex flex-col-relative min-w-0 w-25 bg-white px-4 py-2 rounded-md justify-center">
              <CardHeader className="mb-4 flex justify-center">
                <Heading size='md' className="text-red-600 text-2xl font-bold py-4 px-4 relative justify-center">{hero?.name}</Heading>
              </CardHeader>
              <CardBody className="text-gray-700 px-4 py-1">
                <p>{hero?.publisher}</p>
              </CardBody>
              <CardFooter className="align-right justify-right items-right py-4">
                {/* <button onClick="" className='align-right bg-red-500 hover:bg-red-800 text-white py-2 px-3 rounded-md text-sm'>View Information</button> */}
                <MPopover information={hero}/>
              </CardFooter>
            </Card>

            ))}
          
          
        </SimpleGrid>

        </div>
                </TabPanel>
                <TabPanel>
                  <p>list cards go here</p>
                  {/**Horizantal Cards for the lists */}
              <div className='px-3 py-2 w-4/5 relative justify-center mx-auto' >
                <Card 
                  direction={{base:'column', sm:'row'}}
                  overflow='hidden'
                  variant='outline'
                  className='bg-gray-80 border border-red-300 shadow-md rounded-md px-2 py-4 w-full '
                >
                  <Stack className='w-full'>
                    <CardBody className='w-full'>
                      <Heading size='md' className="text-red-600 font-red-800 text-center">Name</Heading>
                      <p className='text-center'> add table here for superheroes</p>
                      <Accordion className="py-1 px-4 align-center" defaultIndex={[0]} allowMultiple>
                        <AccordionItem className="py-1">
                          <h2>
                            <AccordionButton className="border border-gray-300 h-8 rounded-md px-2">
                              <Box as='span' flex='1' textAlign='left'>Comment by 1
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel  className="px-1 border border-slate-200 " pb={4}>
                            bla bla bla
                          </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem className="py-2">
                          <h2>
                            <AccordionButton className="border border-gray-300 h-8 rounded-md px-2">
                              <Box as='span' flex='1' textAlign='left'>Comment by 2
                              </Box>
                              <AccordionIcon/>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel  className="px-2 border border-slate-200 " pb={4}>
                            bla bla bla
                          </AccordionPanel>
                        </AccordionItem>
                        
                      </Accordion>

                    </CardBody>
                    <CardFooter className="flex align-right items-right justify-right w-full">
                      <input className=" h-8 border border-gray-400 rounded-md focus:border-red-50 focus:ring focus:ring-red-300 focus:shadow-md transition duration-100 mx-5" variant='outline' placeholder='Comment' />
                      <button className='align right bg-red-500 hover:bg-red-800 text-white text-xs py-2 px-4 rounded-md'>Add Comment</button>
                    </CardFooter>
                  </Stack>

                </Card>
              </div>
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
