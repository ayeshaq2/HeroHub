'use client'
import React , {useState, useEffect} from 'react'
const backPort = '3001'
const localhost= 'http://localhost:'

export default function DMCAPolicy() {
    const [policy, setPolicy] = useState('')
    let policyName = 'DMCA and Takedown Policy'

    useEffect(() => {
        
        const fetchPolicyText = async () => {
          try {
            const response = await fetch(`${localhost}${backPort}/api/policies/${policyName}`);
            
            if(response.ok){
              const data = await response.json();
              console.log(data)
              console.log(data.policyText)
              setPolicy(data.policyText);
            } else{
              console.error("Error,", response.status , response.statusText)
            }
            
            
            
          } catch (error) {
            console.error(error);
          }
        };
        fetchPolicyText();
    }, [policy])

  return (
    <>
    <h1 className='text-5xl font-bold text-black'>{policyName}</h1>
    <p>{policy}</p>
    <div className='h-16 bg-white'></div>
    </>
    
  )
}

