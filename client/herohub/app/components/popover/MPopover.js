import React, {useState, useEffect} from 'react'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
    Button,
    Box,
    ButtonGroup
  } from '@chakra-ui/react'
import { info } from 'autoprefixer'

const backPort='3001'

const MPopover =({
    information,

}) =>{
  const initialFocusRef = React.useRef();
  const[listNames, setListNames] = useState([])
  const [selectedList, setSelectedList] = useState("")

  const handleSelectChange = (event)=>{
    setSelectedList(event.target.value)
  }

  useEffect(()=>{
    if(listNames.length===0){
      getLists()
    }
    
  }, [listNames])

   //function to get all existing public list names 
   const getLists = async()=>{
    try{
        const response = await fetch(`http://localhost:${backPort}/getlists/`)
        const data = await response.json()
        console.log(data.result)
        const names = data.result.map(item=>item.name)
        setListNames(names)
    }catch(err){
        console.error('error:', err)
    }}

    //function the adds to the selected list
    //listName comes from the select thing
    const addToList= async()=>{
      try{
        const response = await fetch(`http://localhost:${backPort}/addToList/${selectedList}`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            heroName:information?.name
          })

        })
        const data = await response.json();
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }



    return(
        <Popover
      initialFocusRef={initialFocusRef}
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button className='bg-black text-white py-2 px-4 rounded-md'>View Information</Button>
      </PopoverTrigger>
      <PopoverContent className='text-white bg-slate-700 border border-slate-800 max-w-md w-full rounded-md px-2'>
        <PopoverHeader className='pt-4 font-bold border-0 text-2xl text-red-600 flex justify-center'>
          {information?.name}
        </PopoverHeader>
        <PopoverArrow className='bg-blue-800' />
        <PopoverCloseButton className='absolute top-2 right-2' />
        <PopoverBody className='px-2 flex flex-wrap'>
          <div className='w-full sm:w-1/2'>
          <p className='font-bold'>Race:</p>{information?.race}
         <p className='font-bold'>Publisher:</p>{information?.publisher}
          </div>
          <div className='w-full sm:w-1/2'>
          <p className='font-bold'>Eye Color:</p>{information?.eye_color}
          <p className='font-bold'>Hair Color:</p>{information?.hair_color}
          <p className='font-bold'>Weight</p>{information?.weight}
          </div>
         <p className='font-bold'>Powers:</p>{information?.powers}
        </PopoverBody>
        <PopoverFooter className='border-0 flex items-center justify-between pb-4'
        >
          <Box className='text-sm'>id: {information?.id}</Box>
          <ButtonGroup size='sm'>
            <Button onClick={addToList}className='bg-green-500 text-white px-3 py-1 rounded-md'>Add to List</Button>
            <select onChange={handleSelectChange} className='bg-black-500 text-black px-2 py-1 rounded-md' ref={initialFocusRef}>

              <option value="" disabled selected>
              Select List
              </option>
               {listNames.map((listname, index)=>(
                <option key={index} value={listname}>{listname}</option>
               ))}
              
            </select>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default MPopover;


    

