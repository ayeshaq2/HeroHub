import React from 'react'
backPort = '3001'

export default function ChangePassword(){
    const newPassword = document.getElementById('password').value

    const changePass = async()=>{
        try{
            const response = await fetch(`http://localhost:${backPort}/update/${username.value}`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    newPassword: newPassword
                })
            })
            if(!response.ok){
                throw new Error('Response not okay')

            }
            const data = await response.json()
            console.log(data)
        }catch(err){
            console.error("error", err.message)
        }
    }


  return (
    <div className='  px-5 py-5  flex justify-center items-center h-screen'>
            <div className=' w-80 bg-blue-600 p-8 rounded-md w-4/5 justify-center align-center items-center'>
            <FormControl isRequired className="icon-red">
                <FormLabel color="white" className="py-1">
                    Nickname
                </FormLabel>
                <input id="username" className='py-2 border border-slate-900 h-10 rounded-md px-3 focus:shadow-md' placeholder='First name'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel color="white" className="py-1">
                    New Password
                </FormLabel>
                <input id="password" className='py-2 border border-slate-900 h-10 rounded-md focus:shadow-md px-3' placeholder='Last name'/>
            </FormControl>

            <button onClick={login} className='bg-black text-white py-2 px-4 mt-6 rounded cursor-pointer' > Update Password </button>
            </div>
        </div>

  )
}

