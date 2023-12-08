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
  const localhost= 'http://localhost:'


const UserTable = ({information})=>{

    const deactivate = async(email)=>{
        console.log(email)
        try{
            const response = await fetch(`${localhost}${backPort}/deactivate/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: email
                })
            })
            if(response.ok){
                alert("Account Status changed")
            }
            const data = await response.json()
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    const status =async(email)=>{
        try{
            const response = await fetch(`${localhost}${backPort}/status/`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email:email
                })
            })
            if(response.ok){
                alert("account type changed")
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
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>First Name</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Last Name</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Email</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Username</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Status</Th>
        <Th whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>Account</Th>
      </Tr>
    </Thead>
    <Tbody>
        {information.map((info)=>
        <Tr>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.id}</Td>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.firstName}</Td>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.lastName}</Td>
        <Td whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.email}</Td>
        <Td  whiteSpace="wrap" className="border-r border-gray-300" borderBottomWidth="1px" p={4}>{info.nickname}</Td>
        <Td whiteSpace="wrap"  className="border-r border-gray-300" borderBottomWidth="1px" p={4}><button onClick={()=>deactivate(info.email)}>deactivate</button></Td>
        <Td whiteSpace="wrap"  className="border-r border-gray-300" borderBottomWidth="1px" p={4}><button  onClick={()=>status(info.email)} className='bg-green-500 text-white text-5xl hover:bg-green-800 rounded-md flex justify-center'> + </button></Td>

      </Tr>
        )}
    </Tbody>
    
  </Table>
</TableContainer>
)}

export default UserTable;