
'use client'

import React, {useState, useEffect} from 'react'
import { Stack } from '@chakra-ui/react'
import { Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Search from '../components/search/Search'
import Lists from '../components/Lists/Lists'
import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

  import Navbar from '../components/navigation/navbar/page'
  import PrivateList from '../components/privateLists/PrivateList'
  const backPort = '3001'
  const localhost = 'http://localhost:'
export default function Profile(){
    const [user, setUser] = useState(null)
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
    return(
        //creating a profile card component
        <>
        <Navbar/>
        <Stack>
            <div className="py-20 relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                <div className='flex justify-center items-center py-5'>
                    <div className="flex-wrap justify-center items-center align-center">
                                    <div className="relative">
                                        {/* <img src="https://github.com/creativetimofficial/soft-ui-dashboard-tailwind/blob/main/build/assets/img/illustrations/rocket-white.png?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/> */}
                                        <img src="https://github.com/astrit/css.gg/blob/master/icons/png/black/profile.png?raw=true" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-30 lg:-ml-16 max-w-[150px]"/>
                                    </div>
                        </div>
                </div>
                
                <div className="px-6 py-5 text-center mt-2">
                    <div className="text-center mt-2">
                        <h3 className=" text-2x1 text-slate-700 font-bold leading-normal mb-1">
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <i className="fas fa-map-marker-alt text-slate-400 opacity-75"/>
                    </div>
                    <div className="mt-6 py-4 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light leading-relaxed text-slate-600 mb-4">Account Information</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Stack>

        <div className='w-full h-20 bg-grey--800'></div>

        {/**Creating private lists */}
        <div className='pt-10 flex justify-center'>
        <div className='w-full bg-slate-200 p-6 rounded-md w-4/5 flex justify-center items-center'>
            <div className='relative h-80 sm:h-96'>
 
 </div>

 {/**Creating tabs to switch between characters and lists */}
 <div className='relative mb-4 border-b border-gray-200 dark:border-gray-700 w-full justify-center'>
     
  <Tabs isFitted variant="soft-rounded" className=" my-3 ">
    <TabList mb='1em' className=" text-white inline-flex flex-wrap justify-center bg-black rounded-100px p-1 mb-8">
          <Tab><button className='p-4 px-4 border-b-2 bg-red-700 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-2.5'>Characters</button></Tab>
          
          <Tab className="mx-15  p-4 border-b-2 border-transparent rounded-t-lg text-white hover:border-gray-300 dark:hover:text-gray-300 group">Lists</Tab>
          <Tab className="mx-15  p-4 border-b-2 border-transparent rounded-t-lg text-white hover:border-gray-300 dark:hover:text-gray-300 group">Private Lists</Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            
            {/**put the search component here */}
            <Search />
                </TabPanel>
                <TabPanel>
                  <p>Private Lists</p>
                  <Lists />
                  {/**put list components here */}
                </TabPanel>
                <TabPanel>
                  <p>list cards go here</p>
                  <PrivateList />
                  {/**put list components here */}
                </TabPanel>
              </TabPanels>
            </Tabs>

    </div>
            </div>
        </div>
        
        <footer className="relative pt-6 pb-2 mt-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    
                    </div>
                </div>
            </div>
        </footer>
        </>
    )

}