'use client'
import { Stack } from '@chakra-ui/react'
import { Input, Select, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Heading,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import UserTable from '../components/userTable/UserTable'
import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  const backPort = '3001'
export default function Profile(){
    const [user, setUser] = useState(null)
    const [wUsers, setWUsers] = useState([])
    useEffect(()=>{
        if(wUsers.length===0){
             getUsers();
        }
       
    }, [wUsers])

    useEffect(()=>{
        (
          async()=>{
            const response = await fetch(`http://localhost:${backPort}/api/auth`, {
              credentials:'include'
            });
            const content = await response.json()
            setUser(content)
            //console.log(content)
          } 
        )()})

        const getUsers = async()=>{
            try{
                const response = await fetch(`http://localhost:${backPort}/allUsers`)
                const data = await response.json()

                console.log(data.data)
                if(Array.isArray(data.data)){
                    setWUsers(data.data)
                }else{
                    setWUsers([data.data])
                }
            }catch(err){
                console.log(err)
            }}

            

           

    return(
        //creating a profile card component
        //add the navbar here
        <>
        <Stack>
            
            <div className=" py-20 relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
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
                            Admin - {user?user.nickname:''}
                        </h3>
                        <i className="fas fa-map-marker-alt text-slate-400 opacity-75"/>
                    </div>
                    <div className="mt-6 py-4 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light leading-relaxed text-slate-600 mb-2">Account Information</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Stack>

        <div className='relative mb-4 border-b border-gray-200 dark:border-gray-700 w-full justify-center'>
     
  <Tabs isFitted variant="soft-rounded" className=" my-3 ">
    <TabList mb='1em' className=" text-black inline-flex flex-wrap justify-center bg-slate-200 rounded-100px p-1 mb-8">
          <Tab><button className='p-4 px-4 border-b-2 bg-red-200 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-3 mx-4'>Users</button></Tab>
          
          <Tab className=" p-4 px-4 border-b-2 bg-red-200 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-3 mx-4">Lists</Tab>

          <Tab className=" p-4 px-4 border-b-2 bg-red-200 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-3 mx-4">Policies</Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            <p>cards go here</p>
            <UserTable information={wUsers} />
            
            </TabPanel>
            <TabPanel>
                  <p>list cards go here</p>
                  
                  {/**put list components here */}
            </TabPanel>

            <TabPanel>
                <p>creating some options</p>

                <button></button>
                
                </TabPanel>
              </TabPanels>
            </Tabs>

    </div>

        <div className='w-full h-20 bg-grey--800'></div>

        {/**Creating private lists */}
        <div className='pt-10 flex justify-center'>
            <div className='w-2/5 bg-red-400 p-6 rounded-md w-4/5 flex justify-center items-center'>
                <Stack className="flex justify-center">
                    <h2 className='font-bold text-center text-2xl'>Create List</h2>
                    <button className='w-2/5 bg-red-300 text-black py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-400 flex justify-center'>cancel</button>
                    <FormControl isRequired className="py-3 pb-1">
                        <FormLabel>Name</FormLabel>
                        <input placeholder='Listname' className='px-2 h-10 rounded-md'></input>
                    </FormControl>
                    <button className='w-3/5 bg-green-300 text-black py-2 pt-1 px-2 mt-2 rounded cursor-pointer hover:bg-green-400'>create list</button>

                </Stack> 
            </div>
        </div>
        
        <footer className="relative pt-6 pb-2 mt-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                    <div className="text-sm text-slate-500 font-semibold py-1">
                        Some footer bla bla
                    </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )

}