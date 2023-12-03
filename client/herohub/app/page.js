import React from 'react'
import { Link } from '@chakra-ui/react'
//import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function home() {
  return (
    <div style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.527), rgba(0,0,0,8)), url('home-backg.jpg')", backgroundSize:"100% 100%", backgroundPosition:'cover',boxShadow:'0 4px 6px rgba(0,0,0,0.8)', overflow:'hidden'}}  className='px-5 py-5  flex justify-center items-center h-screen  '>
      {/* <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
       // Adjust the alpha value for darkness
    }}
  ></div> */}
    <div className='w-3/5 bg-black p-8 rounded-md justify-center align-center items-center'>
        <div className='text-white'>
            <h2 className='text-3xl flex justify-center font-bold'>HeroHub</h2>
            <p className='text-sm text-center italic py-5'>Welcome to HeroHub! This is an interactive platfrom for superhero enthusiasts, offering a seamless experience in superhero engagement. Dive into our hub to connect, share and celebrate your favourite superheroes with a vibrant community of like-minded fans. </p>
        </div>
   
   <div className='flex justify-center space-x-4'>
    <Link href="./register">
      <button className='bg-black text-white py-1 px-4 mt-5 rounded cursor-pointer bg-slate-900 hover:bg-red-900' > Register </button>
    </Link>
      
      <Link href='./login'>
        <button className='bg-black text-white py-2 px-4 mt-5 rounded cursor-pointer bg-slate-900 hover:bg-red-900' > Login </button>
      </Link>
      
      <Link href='./homepage'>
      <button  className='bg-black text-white py-2 px-4 mt-5 rounded cursor-pointer bg-slate-900 hover:bg-red-900' > Continue as Guest </button>
      </Link>
      
   </div>
   

    </div>
</div>
  )
}

