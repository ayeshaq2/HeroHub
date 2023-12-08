'use client'
import { Stack } from '@chakra-ui/react'
import PolicyComponent from '../components/policy/PolicyComponent'
import { Input, Select, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Heading,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import UserTable from '../components/userTable/UserTable'
import Navbar from '../components/navigation/navbar/page'
import Navigation from '../components/navigation/page'
  
const backPort = '3001'
const localhost= 'localhost'

export default function Profile(){
    const [user, setUser] = useState(null)
    const [wUsers, setWUsers] = useState([])
    const [privacyPol, setshowprivacyPol] = useState('')
    const [dmcaPol, setshowDMCAPol] = useState('')
    const [AUPPol, setshowAUPPol] = useState('')


    useEffect(()=>{
        if(wUsers.length===0){
             getUsers();
        }
       
    }, [wUsers])

    useEffect(()=>{
        (
          async()=>{
            const response = await fetch(`http://${localhost}:3001/api/auth`, {
              credentials:'include'
            });
            const content = await response.json()
            setUser(content)
            //console.log(content)
          } 
        )()})

        const getUsers = async()=>{
            try{
                const response = await fetch(`${localhost}${backPort}/allUsers`)
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

            const handlePrivacyButton=()=>{
                setshowprivacyPol(!privacyPol)
            }

            const handleDMCAButton=()=>{
                setshowDMCAPol(!dmcaPol)
            }
            const handleAUPButton=()=>{
                setshowAUPPol(!AUPPol)
            }

    return(
        //creating a profile card component
        //add the navbar here
        <>
        <Navigation />
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
          
          

          <Tab className=" p-4 px-4 border-b-2 bg-red-200 border-transparent rounded-t-lg hover:text-white hover:bg-red-900 dark:hover:text-gray-300 group pe-3 mx-4">Policies</Tab>

        </TabList>
        <TabPanels>
          <TabPanel>
            <p>cards go here</p>
            <UserTable information={wUsers} />
            
            </TabPanel>
           

            <TabPanel>
                <p>creating some options</p>
                <Stack>
                    <div>
                    <button onClick={handlePrivacyButton} className=' w-2/5 bg-red-700 text-white py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-900 flex justify-center'>Privacy Policy</button>
                    {privacyPol && <PolicyComponent policyName={'Privacy Policy'} />}
                    </div>

                    <div>
                    <button onClick={handleDMCAButton}  className='w-2/5 bg-red-700 text-white py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-900 flex justify-center'>DMCA notice and Takedown policy</button>
                    {dmcaPol && <PolicyComponent policyName={'DMCA and Takedown Policy'} />}
                    </div>
                    
                    <div>
                    <button onClick={handleAUPButton} className='w-2/5 bg-red-700 text-white py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-900 flex justify-center'>Acceptable Use Policy</button>
                    {AUPPol && <PolicyComponent policyName={'Acceptable Use Policy'}/>}
                    </div>
                    
                </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>

    </div>

        <div className='w-full h-20 bg-grey--800'></div>

        
        
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