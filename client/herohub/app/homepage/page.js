import React from 'react'

export default function home() {
  return (
    <div className='  px-5 py-5  flex justify-center items-center h-screen'>
    <div className=' w-80 bg-black p-8 rounded-md w-4/5 justify-center align-center items-center'>
        <div className='text-white'>
            Information goes here
        </div>
   
    

    <button className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Register </button>
    <button className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Login </button>
    <button  className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Continue as Guest </button>

    </div>
</div>
  )
}

