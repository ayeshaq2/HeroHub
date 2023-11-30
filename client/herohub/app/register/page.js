"use client"
import React, {useState, useEffect} from 'react'

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  const backPort = '3001'

export default function Register(){
        const[input,setInput] = useState('')
        const [isError, setIsError] = useState(false)
        const handleInputChange = (e) =>{setInput(e.target.value)
        setIsError(false)}


        //functionality for user registration, to add them to the database
        const username =  document.getElementById('username')
        const fName= document.getElementById('firstName')
        const lName=document.getElementById('lastName')
        const email=document.getElementById('email')
        const password = document.getElementById('password')
        const checkPassword = document.getElementById('checkPassword')

        function isEmail(checkEmail) {
            var re = /\S+@\S+\.\S+/;
            return re.test(checkEmail);
          }

    
        const registerUser = async()=>{
            if(!password || !username){
                alert("Please fill out necessary fields")
            }

            if(password!=checkPassword){
                alert("Passwords don't match!")
            }

            if(!isEmail(email.value)){
                alert("Please enter a valid email")
            }
            try{
                const response = await fetch(`http://localhost:${backPort}/add/${username.value}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fName:fName.value,
                    lName : lName.value,
                    email: email.value,
                    username:username.value,
                    password:password.value

                }),
            });

                if(!response.ok){
                    throw new Error('Response not okay')

                }
                const data = await response.json()
                console.log(data)
                
            } catch(error){
                console.error('Error', error.message)
            }
        }

        useEffect(()=>{
            registerUser();

        }, [username?.value, fName?.value, lName?.value, email?.value, password?.value])

        const handleSubmit = ()=>{
            registerUser();
            sendOTP()
        }

        //functionality to send an otp to the user
        const sendOTP = async()=>{
            try{
                const response = await fetch(`http://localhost:${backPort}/send/${username.value}`)
                const data = await response.json()
            }catch(err){
                console.error("Error:", err)}
        }

        useEffect(()=>{
            sendOTP();
        }, [username?.value])


        

    return(
        //creating a form for people to register an account
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired>
                <FormLabel color="white" className="">
                    First Name
                </FormLabel>
                <input id="firstName" className='h-10 rounded-md' placeholder='First name'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white">
                    Last Name
                </FormLabel>
                <input id="lastName" className='h-10 rounded-md' placeholder='Last name'/>
            </FormControl>

            <FormControl isRequired isInvalid = {isError}>
                <FormLabel color="white">
                    Email
                </FormLabel>
                <input id="email" className='h-10 rounded-md px-2' type="email" value={input} onChange={handleInputChange}/>
                {!isError?(
                    <FormHelperText color="white">
                        Enter the email you'd like to verify and recieve updates on.
                    </FormHelperText>
                ):(<FormErrorMessage color="maroon">
                    Email is required.
                </FormErrorMessage>)}
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel  color="white">
                    Nickname
                </FormLabel>
                <input id="username" className='h-10 rounded-md' placeholder='Nickname (username)'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Password
                </FormLabel>
                <input id="password" className='h-10 rounded-md' placeholder='Password'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Retype Password
                </FormLabel>
                <input input id="checkPassword" className='h-10 rounded-md' placeholder='Retype Password'/>
            </FormControl>

            <button onClick={handleSubmit} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Submit </button>
        </div>

        </div>
        


    )
}