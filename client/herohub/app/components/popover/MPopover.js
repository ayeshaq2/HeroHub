import React from 'react'

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

const MPopover =({
    information,

}) =>{
  const initialFocusRef = React.useRef();


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
         <p className='font-bold'>Publisher:</p>{information.publisher}
          </div>
          <div className='w-full sm:w-1/2'>
          <p className='font-bold'>Eye Color:</p>{information.eye_color}
          <p className='font-bold'>Hair Color:</p>{information.hair_color}
          <p className='font-bold'>Weight</p>{information.weight}
          </div>
         <p className='font-bold'>Powers:</p>{information.powers}
        </PopoverBody>
        <PopoverFooter className='border-0 flex items-center justify-between pb-4'
        >
          <Box className='text-sm'>id: {information.id}</Box>
          <ButtonGroup size='sm'>
            <Button className='bg-green-500 text-white px-3 py-1 rounded-md'>Add to List</Button>
            <select className='bg-black-500 text-white px-2 py-1 rounded-md' ref={initialFocusRef}>
              Select List
            </select>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default MPopover;


    

