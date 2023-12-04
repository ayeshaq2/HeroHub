
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
const backPort = '3001'

const Lists =()=>{
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])

  //to generate lists each time page is refreshed
  useEffect(()=>{
    if(lists.length===0){
      console.log(lists)
      getLists();
      
    }

  }, [lists]);

  //to get the username
  useEffect(()=>{
    (
      async()=>{
        const response = await fetch('http://localhost:3001/api/auth', {
          credentials:'include'
        });
        const content = await response.json()
        setUser(content)
        //console.log(content)
      } 
    
    ) 
    ()}, [user])

    //to open and close the list form
    const [showListForm, setShowListForm] = useState(false)
    const openListForm=()=>{
        setShowListForm(true)
    }

    const closeListForm=()=>{
        setShowListForm(false)
    }

    //getting the current time for list creation tieme
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12? 'PM':'AM'
    const formattedTime = `${hours%12||12}: ${minutes < 10 ? '0' : ''}${minutes} ${ampm}`

    //getting the current date:
    const day = currentDate.getDate();
    const month = currentDate.toLocaleDateString('default', {month:'long'})
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month}${year}`

    const time = `${formattedTime}, ${formattedDate}`;
   


    const listName = document.getElementById('listName')?.value
    //create list
    const createList = async () =>{
      try{
        const response = await fetch(`http://localhost:${backPort}/createPubList/${listName}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              username: user.nickname,
              time: time
            })
        })

        return response

      }catch(err){
        console.log(err)
      }
    }

    //getting the heroes information for a list
    const [listHeroes, setListHeroes] = useState([])
    

    //showing the heroes of the list
    const showHeroes = async ()=>{
        try{
            const response = await fetch(`http://localhost:${backPort}/get-heroes/${listName}`)
            const data = await response.json()

            if(Array.isArray(data.data)){
                setListHeroes(data.data)
            }else{
                setListHeroes([data.data])
            }
        }catch(error){
            console.error('Error:', error)
        }}

    const getLists = async()=>{
      try{
        const response = await fetch(`http://localhost:${backPort}/getLists`)
        const data = await response.json()

        console.log(data.result)

        if(Array.isArray(data.result)){
          setLists(data.result)
        }else{
          setLists([data.result])
        }

        console.log(lists.flat())
      }catch(err){
        console.log(err)
      }
    }

    return(
        <div className='px-3 py-2 w-4/5 relative justify-center mx-auto' >
               <button onClick={openListForm} className='flex justify-center h-15 px-5 bg-red-500 hover:bg-red-700 text-white text-xl py-2 px-4 rounded-md mb-4'>Create List</button>
                  {showListForm && (<div className='py-4 pt-5 pb-5  relative justify-center bg-slate-100 border border-red-800 rounded-xl '>
                    <Stack className='relative justify-center'>

                    <button onClick={closeListForm} className='w-1/2 px-5 py-3 bg-slate-500 hover:bg-slate-600 text-white text-xs py-2 px-4 rounded-md'>cancel</button>
                    <label>Name</label>
                    <input id='listName' placeholder='List name'></input>
                    <button onClick={createList} className='w-1/2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-4 rounded-md'>create</button>

                    </Stack>
                    
                  </div>)}
                  
            {lists.map((list)=>(
                <Card 
                id={list.id}
                direction={{base:'column', sm:'row'}}
                overflow='hidden'
                variant='outline'
                className='bg-gray-80 border border-red-300 shadow-md rounded-md px-2 py-3 w-full '
                >
                <Stack className='w-full '>
                  <CardBody className='w-full'>
                    <Heading size='md' style={{display:'relative', padding:'0.25rem 0.5rem', transition:'background 0.3s', cursor:'pointer', }} className="mx-auto align-center text-center text-red-500 text-xl font-bold hover:bg-black rounded-md">{list.name}</Heading>
                    {/* <p className='text-center'> add table here for superheroes</p> */}


                    <p>(Number-of) superheroes: {list.heroes ? JSON.parse(list.heroes).length : 0}</p>
                    <p>Rating: {list.rating}</p>
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
                  <p className='text-slate-400'>Created by: {list.user} {list.time} </p>
                </Stack>

                </Card>)
                )}
               
              </div>
    )
}

export default Lists