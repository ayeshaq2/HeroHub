import React from 'react'
import { Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
    <div className='flex space-x-4 justify-center border border-black bg-slate-300 py-3'>
    <Link href='./privacy'>
        <button className='w-3/5 bg-red-700 text-white py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-900 flex justify-center'>Privacy Policy</button>
    </Link>
    
    <Link href='./dmca'>
        <button className='w-4/5 bg-red-700 text-white py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-900 flex justify-center'>DMCA & Takedown Policy</button>
    </Link>
    
    <Link href='./aup'>
        <button className='w-3/5 bg-red-700 text-white py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-red-900 flex justify-center'>Acceptable Use Policy</button>
    </Link>
    </div>
    
    </>
  )
}

export default Footer