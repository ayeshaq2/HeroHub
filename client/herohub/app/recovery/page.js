import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

  import React, {useState, useEffect} from 'react'

  const backPort = '3001'
  const localhost= 'http://localhost:'

export default function Recovery(){
    const [username, setUsername] = useState('')
    const [newPass, setNewPass] = useState('')

    const changePass = async()=>{
        try{
            const response = fetch(`${localhost}${changePass}/update/${username}`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                }, 
                body: JSON.stringify({
                    newPassword : newPass
                })
    
            })
    
            if(!response.ok){
                    
                alert('Couldnt reset, please try again')
                
                throw new Error('Response not okay')
            }else{
                alert("password changed")
    
                // alert('successful login!')
                window.location.href='/login'
                
            }
            const data = await response.json()
            console.log(data)
            console.log(response)

        }catch(err){
            console.log(err)
        }
       
    }

    return(
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired>
                <FormLabel color="white" className="">
                    Email
                </FormLabel>
                <input onChange={(e)=> setUsername(e.target.value)} className='h-10 rounded-md' placeholder='First name'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white">
                    Set New Password
                </FormLabel>
                <input onChange={(e)=> setNewPass(e.target.value)} className='h-10 rounded-md' placeholder='Last name'/>
            </FormControl>

            <button className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Reset </button>
            </div>
        </div>
    )
}