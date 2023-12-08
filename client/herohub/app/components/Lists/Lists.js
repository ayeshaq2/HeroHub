
import React, {useEffect, useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Input,Heading, Stack, FormControl, FormLabel} from '@chakra-ui/react'
import Comments from '../comments/Comments'
import TheTable from '../Table/table'
import { stringify } from 'postcss'
import e from 'cors'
import { Switch } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

const backPort = '3001'
const localhost= 'http://localhost:'

const Lists =()=>{
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])
  const [listHeroes, setListHeroes] = useState([])
  const [selectedList, setSelectedList] = useState(null)
  

  //to generate lists each time page is refreshed
  useEffect(()=>{
    if(lists.length===0){
      console.log(lists)
      getLists();
      console.log(listHeroes)
      Promise.all(lists.map((list)=>showHeroes(list.name)))
      
    }

  }, [lists, listHeroes]);

  //to get the username
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
      const listName = document.getElementById('listName')?.value
      const isPublic =document.getElementById('listState').checked

      //checking if the list should be made public or private

      let apiUrl;

      if(isPublic){
        apiUrl = `${localhost}${backPort}/createPubList/${listName}`
      }else{
        apiUrl = `${localhost}${backPort}/createPriList/${listName}`
      }

      try{
        const response = await fetch(apiUrl, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              username: user? user.nickname : 'guest',
              time: time
            })
        })

        if(response.ok){
          
          const updatedLists = await fetch(`${localhost}${backPort}/getLists`)
          const updatedListsData = await updatedLists.json()

          if(Array.isArray(updatedListsData.result)){
            setLists(updatedListsData.result)
          }else{
            setLists([updatedListsData.result])
          }
          alert("created!")
          closeListForm();
        }else{
          alert("failed to create, please try again")
        }
        return response
      }catch(err){
        console.log(err)
      }
    }
    //getting the heroes information for a list
    
    // useEffect(()=>{{
    //     //console.log(lists)
    //     showHeroes()
    //   }
    // }, [listHeroes]);
  
    //showing the heroes of the list
    const showHeroes = async (listName)=>{
        try{
            const response = await fetch(`${localhost}${backPort}/get-heroes/${listName}`)
            const data = await response.json()

            if(Array.isArray(data.data)){
                setListHeroes(data.data)
                
            }else{
                setListHeroes([data.data])
            }
        }catch(error){
            console.error('Error:', error)
        }}

        const toggleList = async(list)=>{
          if(selectedList === list.name){
            setSelectedList(null)
          }else{
            setSelectedList(list.name)
            await showHeroes(list.name)
          }
        }

    const getLists = async()=>{
      try{
        const response = await fetch(`${localhost}${backPort}/getLists`)
        const data = await response.json()

        console.log(data.result.name)

        if(Array.isArray(data.result)){
          setLists(data.result)
          data.result.forEach(async(list)=>{
            console.log(list.name)
            // await showHeroes(list.name)
          })
        }else{
          setLists([data.result])
          // await showHeroes (data.result.name)
        }

        console.log(lists.flat())
      }catch(err){
        console.log(err)
      }
    }

    const deleteList = async(listname)=>{
      try{
        const response = await fetch(`${localhost}${backPort}/deleteList/${listname}`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          }
        })

        if(response.ok){
          setLists((lists)=>lists.filter(list=> list.name !== listname))
        }
        return response
      }catch(err){
        console.log(err)
      }
    }

    

    const comment = document.getElementById('comment')?.value
    return(
        <div className='px-3 py-2 w-4/5 relative justify-center mx-auto' >
          {user && (<button onClick={openListForm} className='flex justify-center h-15 px-5 bg-red-500 hover:bg-red-700 text-white text-xl py-2 px-4 rounded-md mb-4'>Create List</button>)}
               
                  {showListForm && (<div className='py-4 pt-5 pb-5  relative justify-center bg-white border border-red-800 rounded-xl '>
                    <Stack className='relative justify-center'>
                      <h2 className='font-bold text-xl'>Create a List</h2>
                      <Checkbox id='listState' iconColor='red.400' iconSize='1rem' className='bg-slate-100 hover:bg-slate-200 text-underline'>Make Public</Checkbox>
                      
                    <button onClick={closeListForm} className='w-1/2 px-5 py-3 bg-slate-500 hover:bg-slate-600 text-white text-xs py-2 px-4 rounded-md'>cancel</button>
                    <label>Name</label>
                    <input className='border border-black' id='listName' placeholder='List name'></input>
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
                    <Heading onClick={()=> toggleList(list)}size='md' style={{display:'relative', padding:'0.25rem 0.5rem', transition:'background 0.3s', cursor:'pointer', }} className="mx-auto align-center text-center text-red-500 text-xl font-bold hover:bg-black rounded-md">{list.name}</Heading>

                    {/**TABLE FOR HEROES */}
                    {selectedList === list.name && <TheTable information = {listHeroes} listName={list.name} />}

                    {/* <p className='text-center'> add table here for superheroes</p> */}
                    <p>(Number-of) superheroes: {list.heroes ? JSON.parse(list.heroes).length : 0}</p>
                    <p>Rating: {list.rating}</p>

                  {user && (
                    <Comments list = {list?.name}/>

                  )}
                    
                  </CardBody>
                  <CardFooter className="flex align-right items-right justify-right w-full">
                    <button onClick={()=>deleteList(list.name)} className='align right bg-red-700 hover:bg-red-900 text-white text-xs py-2 px-4 rounded-md'>DELETE LIST</button>
                    
                  </CardFooter>
                  <p className='text-slate-400'>Created by: {list.user} {list.time} </p>
                </Stack>

                </Card>)
                )}
               
              </div>
    )
}

export default Lists