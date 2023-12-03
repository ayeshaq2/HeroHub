import React, {useState, useEffect} from 'react';
import Link from "next/link";
import { Input, Heading, Stack, Select, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import MPopover from "../popover/MPopover"
const backPort = '3001'



const Search=()=>{
    const [heroes, setHeroes] = useState([]) //for the searching superheroes
    const [searchOption, setSeaarchOption] = useState('name') //search option
    // const [searchOpt, setSearchOpt] = useState('name')
    // const [searchVal, setSearchVal] = useState('')


    const searchVal = document.getElementById("search")
    const searchbtn = document.getElementById('searchBtn')
    const searchOpt = document.getElementById("searchOption")

    //fetch for the search option
  const fetchdata =async ()=>{
    try{
      const response = await fetch(`http://localhost:${backPort}/search/${searchOpt?.value}/${searchVal?.value}`)
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

    // useEffect(()=>{
    
    //     fetchdata();
    //     console.log(heroes)
    //   }, [searchOpt?.value,searchVal?.value])
    
      const handleSearchClick = () =>{
        fetchdata();
      }

    return( <>
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
    { heroes.length > 0 &&(
   <SimpleGrid className="py-5 px-5 " spacing={10} templateColumns='repeat(auto-fill, minmax(200px,1fr))'>
     {heroes.map((hero)=>(
       <Card key={hero?.id} className="border border-red-800 flex flex-col-relative min-w-0 w-25 bg-white px-4 py-2 rounded-md justify-center">
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
    )}

</div>
</>
  )
}

export default Search; 