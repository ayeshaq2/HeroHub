import {

    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

export default function Recovery(){
    return(
        <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired>
                <FormLabel color="white" className="">
                    Email
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='First name'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white">
                    Set New Password
                </FormLabel>
                <input className='h-10 rounded-md' placeholder='Last name'/>
            </FormControl>

            <button className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Reset </button>
            </div>
        </div>
    )
}