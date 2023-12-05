import React, {useState, useEffect} from 'react'
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

  const backPort = '3001'
const Comments = ({list}) => {
    const [comm, setComm] = useState('')

    const addComment = async()=>{
        try{
          console.log("called")
          const response = await fetch(`http://localhost:${backPort}/addComment/${list}`, {
            method:'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              comment:`${comm}`
            })
  
          })
          return response
          
        }catch(err){
          console.log(err)
        }
      }
  return (
    <>
    <div>
    <Accordion className="py-1 px-4 align-center" defaultIndex={[0]} allowMultiple>
        <AccordionItem className="py-1">
                <h2>
                    <AccordionButton className="border border-gray-300 h-8 rounded-md px-2">
                        <Box as='span' flex='1' textAlign='left'>Comment by 1</Box>
                        <AccordionIcon/>
                        </AccordionButton>
                        </h2>
                        <AccordionPanel  className="px-1 border border-slate-200 " pb={4}>
                          bla bla bla
                        </AccordionPanel>
            </AccordionItem> 
        </Accordion>
        <input onChange={(e)=>setComm(e.target.value)} className=" h-8 border border-gray-400 rounded-md focus:border-red-50 focus:ring focus:ring-red-300 focus:shadow-md transition duration-100 mx-5" variant='outline' placeholder='Comment' />
        <button onClick={()=>addComment()} className='align right bg-red-500 hover:bg-red-800 text-white text-xs py-2 px-4 rounded-md'>Add Comment</button> 
                    
                    
    </div>
    </>
  )
}

export default Comments