"use client"
import {useState} from 'react'

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

export default function Register(){

        const[input,setInput] = useState('')
        const handleInputChange = (e) =>setInput(e.target.value)
        const isError = input === ''

        //setting handleSubmit
    

    return(
        //creating a form for people to register an account
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired>
                <FormLabel color="white" className="">
                    First Name
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='First name'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white">
                    Last Name
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='Last name'/>
            </FormControl>

            <FormControl isRequired isInvalid = {isError}>
                <FormLabel color="white">
                    Email
                </FormLabel>
                <input className='h-10 rounded-md px-2' type="email" value={input} onChange={handleInputChange}/>
                {!isError?(
                    <FormHelperText color="white">
                        Enter the email you'd like to verify and recieve updates on.
                    </FormHelperText>
                ):(<FormErrorMessage color="maroon">
                    Email is required.
                </FormErrorMessage>)}
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Nickname
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='Nickname (username)'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Password
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='Password'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Retype Password
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='Retype Password'/>
            </FormControl>

            <button className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Submit </button>
        </div>

        </div>
        


    )
}