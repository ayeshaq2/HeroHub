import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

  const backPort = '3001'


const TheTable = ({information, listName})=>{

    // const deleteFromList = async(heroName)=>{
    //     try{
    //         await onDeleteHero(heroName);
    //     }catch(error){
    //         console.error('Error', error)
    //     }
    // }

    const deleteFromList =async (heroname)=>{
        try{
            const response = await fetch(`http://localhost:${backPort}/deleteHero/${listName}/${heroname}`, {
                method:'DELETE'
            })

            if (response.ok){
                console.log('DELETD')
            }else{
                console.error(("error"))
            }
        }catch(err){
            console.log(err)
        }
    }
    return(
    <TableContainer>
  <Table size='sm' borderWidth="2px" borderRadius="md">
    <Thead>
      <Tr>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>id</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Name</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Race</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Gender</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Publisher</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Powers</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
        {information.map((info)=>
        <Tr>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.id}</Td>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.name}</Td>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.race}</Td>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.gender}</Td>
        <Td  whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.publisher}</Td>
        <Td whiteSpace="wrap"  className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.powers}</Td>
        <Td whiteSpace="wrap"  className="border-r border-gray-300" borderBottomWidth="1px" p={4}><button  onClick={()=> deleteFromList(info.name)} className='bg-red-500 text-white text-5xl hover:bg-red-800 rounded-md flex justify-center'> - </button></Td>

      </Tr>
        )}
    </Tbody>
    
  </Table>
</TableContainer>
)}

export default TheTable;