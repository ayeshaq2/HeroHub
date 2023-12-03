"use client"
import {useState} from 'react'
import { Link } from '@chakra-ui/react'
const backPort = '3001'

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'



export default function Login(){
    const[input,setInput] = useState('')
    const [email, setEmail] = useState('');
    const [showPinInput, setShowPinInput] = useState(false)
        const [pin, setPin] = useState('')

        const handlePinInputChange = (e) =>{
            setPin(e.target.value);
        };

    //setting up login functionality 

    //email = document.getElementById('email')?.value
    const inputpassword = document.getElementById('password')

    //checks if the entered email exists as a registered user 
    const emailCheck = async()=>{
        console.log(email)
        console.log(inputpassword)
        try{
            const response = await fetch(`http://localhost:${backPort}/email-check/${email}`)
            console.log(email)
            const data = await response.json()
            console.log(data)

            if(!data.exists){
                alert("Email does not exist")
                
            }else{
                verified()}
        }catch(err){
            console.log(err)
        }
    }

    //api endpoint to see if the entered account/email has been verified or not
    const verified = async()=>{
        try{
            const response = await fetch(`http://localhost:${backPort}/verified/${email}`)
            const data = await response.json()

            if(data.success){
                login()
            }else{
                const otp1 = Math.floor(1000 +Math.random()*9000)
                alert("You are not verified. Taking you to verification page...")
                window.location.href = '/validation'
            }

        }catch(err){
            console.log(err)
        }
    }

    const login = async()=>{
        try{
            const response = await fetch(`http://localhost:${backPort}/login/${username.value}`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   inputPass: inputpassword

                })
            })

            if(!response.ok){
                throw new Error('Response not okay')
            }else{
                alert('successful login!')
                
            }

            const data = await response.json()
            console.log(data)

        }catch(err){
            console.error("error:", err.message)
        }

    }

    return(
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired className="icon-red">
                <FormLabel color="white" className="py-1">
                    Email
                </FormLabel>
                <input onChange={(e)=> setEmail(e.target.value)} id="email" className='py-2 border border-slate-900 h-10 rounded-md px-3 focus:shadow-md' placeholder='Email'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white" className="py-1">
                    Password
                </FormLabel>
                <input id="password" className='py-2 border border-slate-900 h-10 rounded-md focus:shadow-md px-3' placeholder='Last name'/>
            </FormControl>

            <FormControl >
                <FormHelperText className="py-3 text-md font-bold hover:underline hover:underline-offset-2 cursor-pointer">
                    <Link href='changePass'>Reset Password?</Link>
                    </FormHelperText>
            </FormControl>

            <button onClick={emailCheck} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Submit </button>
            </div>
        </div>


    )
}