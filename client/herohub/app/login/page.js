"use client"
import {useState} from 'react'

import { Link, Stack} from '@chakra-ui/react'
const backPort = '3001'
const localhost= 'http://localhost:'

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'



export default function Login(){

    //including token
    // const headers = {
    //     Authorization: `Bearer ${token}`
    // }


    const[input,setInput] = useState('')
    const [email, setEmail] = useState('');
    const[inputPassword, setInputPassword] = useState('')
    const [showPinInput, setShowPinInput] = useState(false)
        const [pin, setPin] = useState('')

        const handlePinInputChange = (e) =>{
            setPin(e.target.value);
        };

    //setting up login functionality 

    //email = document.getElementById('email')?.value
    //const inputpassword = document.getElementById('password')

    //checks if the entered email exists as a registered user 
    const emailCheck = async()=>{
        
        try{
            const response = await fetch(`${localhost}${backPort}/email-check/${email}`)
            console.log(email)
            const data = await response.json()
            console.log(data)

            if(!data.exists){
                alert("Email does not exist")
                
            }else{
                console.log('enteres1')
                verified()}
        }catch(err){
            console.log(err)
        }
    }

//api endpoint to see if theyre account is disabled
    const statusCheck = async()=>{
        try{
            const response = await fetch(`${localhost}${backPort}/statusCheck/${email}`)
            const data = await response.json()

            if(data.success){
                //verified()
                alert("successful login!")
                window.location.href='/homepage'
            }else{
                alert("You're account has been disabled, please contact Site Manager")
                window.location.href='/';
            }
        }catch(err){
            console.log(err)
        }
    }

    //api endpoint to see if the entered account/email has been verified or not
    const verified = async()=>{
        try{
            const response = await fetch(`${localhost}${backPort}/verified/${email}`)
            const data = await response.json()

            if(data.success){
                console.log('entered2')
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
        console.log('entered3')
        try{
            const response = await fetch(`${localhost}${backPort}/login/${email}`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include',
                body: JSON.stringify({
                   inputPass: inputPassword

                })
            })
            

            if(!response.ok){
                
                alert('Incorrect credentials, please try again')
                
                throw new Error('Response not okay')
            }else{
                statusCheck()

                // alert('successful login!')
                // window.location.href='/homepage'
                
            }

            const data = await response.json()
            console.log(data)
            console.log(response)

        }catch(err){
            console.error("error:", err.message)
        }

    }

    return(
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <Stack>
            <div className='text-5xl text-red-900 bg-white relative rounded-sm font-bold flex justify-center '>Login</div>
            <div className=' w-80 bg-red-700 p-8 rounded-md w-4/5 justify-center align-center items-center'>
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
                <input onChange={(e)=> setInputPassword(e.target.value)}   id="password" className='py-2 border border-slate-900 h-10 rounded-md focus:shadow-md px-3' placeholder='Last name'/>
            </FormControl>

            <FormControl >
                <FormHelperText className="py-3 text-md font-bold hover:underline hover:underline-offset-2 cursor-pointer">
                    <Link href='changePass'>Reset Password?</Link>
                    </FormHelperText>
            </FormControl>

            <button onClick={emailCheck} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Submit </button>
            </div>

            </Stack>
            
        </div>


    )
}