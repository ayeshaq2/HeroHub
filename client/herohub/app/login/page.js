"use client"
import {useState} from 'react'

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'


export default function Login(){

    return(
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired className="icon-red">
                <FormLabel color="white" className="py-1">
                    Nickname
                </FormLabel>
                <input className='py-2 border border-slate-900 h-10 rounded-md px-3 focus:shadow-md' placeholder='First name'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white" className="py-1">
                    Password
                </FormLabel>
                <input className='py-2 border border-slate-900 h-10 rounded-md focus:shadow-md px-3' placeholder='Last name'/>
            </FormControl>

            <FormControl >
                <FormHelperText className="py-3 text-md font-bold hover:underline hover:underline-offset-2 cursor-pointer">Reset Password?</FormHelperText>
            </FormControl>

            <button className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Submit </button>
            </div>
        </div>


    )
}