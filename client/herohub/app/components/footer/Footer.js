import React from 'react'
import { Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <>
    <div className='flex space-x-4 justify-center border border-red-800 bg-black py-1'>
    <Link href='./privacy'>
        <button className='w-full bg-white text-black text-xs py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-slate-300 flex justify-center'>Privacy Policy</button>
    </Link>
    
    <Link href='./dmca'>
        <button className='w-full bg-white text-black text-xs py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-slate-300 flex justify-center'>DMCA & Takedown Policy</button>
    </Link>
    
    <Link href='./aup'>
        <button className='w-full bg-white text-black text-xs py-1 pb-2 px-4 mt-2 rounded cursor-pointer hover:bg-slate-300 flex justify-center'>Acceptable Use Policy</button>
    </Link>
    </div>
    
    </>
  )
}

export default Footer