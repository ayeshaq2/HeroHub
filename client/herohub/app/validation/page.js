"use client"
import {useState} from 'react'
import { Link, Stack } from '@chakra-ui/react'

import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

  const backPort = '3001'

export default function Validate(){
        const [showPinInput, setShowPinInput] = useState(false)
        const [pin, setPin] = useState('')
        const [email, setEmail] = useState('')
        const [user, setUser] = useState('')


        const handlePinInputChange = (e) =>{
            setPin(e.target.value);
        };

        //email = document.getElementById('email');

        const sendOTP = async()=>{
          const otp1 = Math.floor(1000 +Math.random()*9000)
          console.log("bla bla",otp1)
          console.log(`Here's your otp: ${otp1}`)
          try{
              const response = await fetch(`http://localhost:${backPort}/send-mail/${email}`,{
                  method: 'POST',
                  headers:{
                      'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: email, 
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

      //const inputPin = document.getElementById('pin')?.value
      //const email = document.getElementById('username')?.value

        const checkOTP = async() => {
            
            try{
                const response = await fetch(`http://localhost:${backPort}/verify`, {
                    method:'POST', 
                    headers:{
                        'Content-Type':"application/json"
                    }, 
                    body: JSON.stringify({
                        email: email,
                        pin : pin
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

        const handleVerify=()=>{
            sendOTP()
            setShowPinInput(true)
            

        }



    return(
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <Stack>

            <div className='text-5xl text-red-900 bg-white relative rounded-sm font-bold flex justify-center '>Verify Account</div>
            <div className=' w-80 bg-red-700 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired className="icon-red">
                <FormLabel color="white" className="py-1">
                    Email
                </FormLabel>
                <input  onChange={(e) => setEmail(e.target.value)}  id="email" className='py-2 border border-slate-900 h-10 rounded-md px-3 focus:shadow-md' placeholder='Email'/>
            </FormControl>
            <FormControl isRequired className="icon-white">
                <FormLabel color="white" className="py-1">
                    Username
                </FormLabel>
                <input onChange={(e)=> setUser(e.target.value)} id="username" className='py-2 border border-slate-900 h-10 rounded-md px-3 focus:shadow-md' placeholder='Username'/>
            </FormControl>


            <button onClick={handleVerify} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Send Code </button>

            {showPinInput && (
                <div className='mt-4'>
                    <FormControl isRequired>
                        <FormLabel className='text-white'>Enter Your Verification Pin:</FormLabel>
                        <input id='pin' className='h-10 rounded-md px-2' type='text' maxLength={4} value={pin} onChange={handlePinInputChange}/>
                    </FormControl>
                    
                    <button onClick={checkOTP}  className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer'>Verify</button>
                </div>
            )}

            </div>

            </Stack>
            
        </div>


    )
}
