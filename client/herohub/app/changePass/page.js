'use client'

import React, { useState } from 'react'
import { FormControl, FormLabel, Stack} from '@chakra-ui/react'
const backPort = '3001'
const localhost= 'http://localhost:'

export default function ChangePassword(){
    const [newPass, setNewPass] = useState('')
    const[email, setEmail] = useState('')
    //const newPassword = document.getElementById('password')?.value

    const changePass = async()=>{
        try{
            const response = await fetch(`${localhost}${backPort}/update/${email}`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    newPassword: newPass
                })
            })
            if(!response.ok){
                throw new Error('Response not okay')
            }
            alert("password changed!")
            const data = await response.json()
            console.log(data)
        }catch(err){
            console.error("error", err.message)
        }
    }


  return (
    <div className='  px-5 py-5  flex justify-center items-center h-screen'>
        <Stack>

        <div className='text-5xl text-red-900 bg-white relative rounded-sm font-bold flex justify-center '>Change Password</div>
            <div className='py-5 w-80 bg-red-700 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired className="icon-red">
                <FormLabel color="white" className="py-1">
                    Email
                </FormLabel>
                <input onChange={(e)=>setEmail(e.target.value)} id="username" className='py-2 border border-slate-900 h-10 rounded-md px-3 focus:shadow-md' placeholder='Email'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white" className="py-1">
                    New Password
                </FormLabel>
                <input onChange={(e)=>setNewPass(e.target.value)} id="password" className='py-2 border border-slate-900 h-10 rounded-md focus:shadow-md px-3' placeholder='New password'/>
            </FormControl>

            <button onClick={changePass} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer hover:bg-slate-800' > Update Password </button>
            </div>

        </Stack>
         
        </div>

  )
}

