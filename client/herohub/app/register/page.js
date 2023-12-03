"use client"
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
//const Navigate = useNavigate();
import Link from 'next/link';
import { useRouter } from 'next/router'
// import { Link } from '@chakra-ui/react'
// import { ExternalLinkIcon } from '@chakra-ui/icons'
// import NextLink from "next/link"

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  const backPort = '3001'

export default function Register(){
    // const router = useRouter();
        const[input,setInput] = useState('')
        const [isError, setIsError] = useState(false)
        const handleInputChange = (e) =>{setInput(e.target.value)
        setIsError(false)}
        const [showPinInput, setShowPinInput] = useState(false)
        const [pin, setPin] = useState('')

        const handlePinInputChange = (e) =>{
            setPin(e.target.value);
        };

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

        
        const validateForm=()=>{
            if (!username?.value || !fName?.value || !lName?.value || !email?.value || !password?.value) {
                alert('Please fill out necessary fields');
                return false;
              }

            if(password?.value!=checkPassword?.value){
                alert("Passwords don't match!")
                return false;
            }
            if(!isEmail(email?.value)){
                alert("Please enter a valid email")
                return false;
            }
            return true;
        }

        const registerUser = async()=>{
        
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
            sendOTP();

                if(!response.ok){
                    throw new Error('Response not okay')

                }
                const data = await response.json()
                console.log(data)
                
            } catch(error){
                console.error('Error', error.message)
            }
        }

        // useEffect(()=>{
        //     registerUser();
            

        // }, [username?.value, fName?.value, lName?.value, email?.value, password?.value])

        //functionality to send an otp to the user
        const sendOTP = async()=>{
            const otp1 = Math.floor(1000 +Math.random()*9000)
            console.log("bla bla",otp1)
            console.log(`Here's your otp: ${otp1}`)
            try{
                const response = await fetch(`http://localhost:${backPort}/send/${username.value}`,{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value, 
                    otp: otp1
                })
            },
                )
                if(!response.ok){
                    throw new Error('Response not okay')
                }
                const data = await response.json()
                console.log(data)
                alert(`Here is your verification code: ${otp1}`)
               
            }catch(err){
                console.error("Error:", err)}
        }

        // useEffect(()=>{
        //     if(username?.value){
        //         sendOTP();

        //     }
            
        // }, [username?.value])

        
        const inputPin = document.getElementById('pin')?.value

        const checkOTP = async() => {
            //console.log(inputPin?.value)
            try{
                const response = await fetch(`http://localhost:${backPort}/verify`, {
                    method:'POST', 
                    headers:{
                        'Content-Type':"application/json"
                    }, 
                    body: JSON.stringify({
                        email:email,
                        pin : inputPin
                    })
                })
                const data = await response.json()

                if(data.success){
                    alert('Verification Successful!');
                    window.location.href='/login'
                
                    
                }else{
                    alert("Verification Failed, pleaae try again")
                }


            } catch(err){console.log(err)}


        }

        // useEffect(()=>{
        //     checkOTP();
        // }, [username?.value])


        const handleSubmit = ()=>{
            if(validateForm()){
                registerUser()
            }
            
            setShowPinInput(true)
        }


        

    return(
        //creating a form for people to register an account
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>

            <div className=' w-2/5 bg-red-900 p-8 rounded-md justify-center align-center items-center'>
            <FormControl >
                <FormLabel color="white" className="">
                    First Name
                </FormLabel>
                <input id="firstName" className='h-10 w-full rounded-md' placeholder='First name'/>
            </FormControl>

            <FormControl >
                <FormLabel color="white">
                    Last Name
                </FormLabel>
                <input id="lastName" className='h-10 w-full rounded-md' placeholder='Last name'/>
            </FormControl>

            <FormControl isRequired isInvalid = {isError}>
                <FormLabel color="white">
                    Email
                </FormLabel>
                <input id="email" className='h-10 w-full rounded-md px-2' type="email" value={input} onChange={handleInputChange}/>
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
                <input id="username" className='h-10 w-full rounded-md' placeholder='Nickname (username)'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Password
                </FormLabel>
                <input id="password" className='h-10 w-full rounded-md' placeholder='Password'/>
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel color="white">
                    Retype Password
                </FormLabel>
                <input input id="checkPassword" className='h-10 w-full rounded-md' placeholder='Retype Password'/>
            </FormControl>

            <button onClick={handleSubmit} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer hover:bg-slate-800' > Submit </button>

            {showPinInput && (
                <div className='mt-4'>
                    <FormControl isRequired>
                        <FormLabel className='text-white'>Enter Your Verification Pin:</FormLabel>
                        <input id='pin' className='h-10 w-full rounded-md px-2' type='text' maxLength={4} value={pin} onChange={handlePinInputChange}/>
                    </FormControl>
                    
                    <button onClick={checkOTP} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer'>Verify</button>
                </div>
            )}
        </div>
        </div>
    )
}