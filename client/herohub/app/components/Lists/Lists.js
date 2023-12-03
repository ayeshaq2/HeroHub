
import React, {useEffect, useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Input,Heading, Stack, Select, SimpleGrid, Grid, GridItem} from '@chakra-ui/react'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

const Lists =()=>{

    //to open and close the list form
    const [showListForm, setShowListForm] = useState(false)
    const openListForm=()=>{
        setShowListForm(true)
    }

    const closeListForm=()=>{
        setShowListForm(false)
    }

    //


    return(
        <div className='px-3 py-2 w-4/5 relative justify-center mx-auto' >
               <button onClick={openListForm} className='flex justify-center h-15 px-5 bg-red-500 hover:bg-red-700 text-white text-xl py-2 px-4 rounded-md mb-4'>Create List</button>
                  {showListForm && (<div className='py-4 pt-5 pb-5  relative justify-center bg-slate-100 border border-red-800 rounded-xl '>
                    <Stack className='relative justify-center'>

                    <button onClick={closeListForm} className='w-1/2 px-5 py-3 bg-slate-500 hover:bg-slate-600 text-white text-xs py-2 px-4 rounded-md'>cancel</button>
                    <label>Name</label>
                    <input placeholder='List name'></input>
                    <button className='w-1/2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-4 rounded-md'>create</button>

                    </Stack>
                    
                  </div>)}
                <Card 
                  direction={{base:'column', sm:'row'}}
                  overflow='hidden'
                  variant='outline'
                  className='bg-gray-80 border border-red-300 shadow-md rounded-md px-2 py-3 w-full '
                >
                  <Stack className='w-full '>
                    <CardBody className='w-full'>
                      <Heading size='md' style={{display:'relative', padding:'0.25rem 0.5rem', transition:'background 0.3s', cursor:'pointer', }} className="mx-auto align-center text-center text-red-500 text-xl font-bold hover:bg-black rounded-md">Name</Heading>
                      {/* <p className='text-center'> add table here for superheroes</p> */}


                      <p>(Number-of) superheroes:</p>
                      <p>Rating:</p>
                      <Accordion className="py-1 px-4 align-center" defaultIndex={[0]} allowMultiple>
                        {/* <AccordionItem className="py-1">
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
                        </AccordionItem> */}

                      </Accordion>

                    </CardBody>
                    <CardFooter className="flex align-right items-right justify-right w-full">
                      {/* <input className=" h-8 border border-gray-400 rounded-md focus:border-red-50 focus:ring focus:ring-red-300 focus:shadow-md transition duration-100 mx-5" variant='outline' placeholder='Comment' />
                      <button className='align right bg-red-500 hover:bg-red-800 text-white text-xs py-2 px-4 rounded-md'>Add Comment</button> */}
                      
                      
                    </CardFooter>
                    <p className='text-slate-400'>Created by:  (time)</p>
                  </Stack>

                </Card>
              </div>
    )
}

export default Lists