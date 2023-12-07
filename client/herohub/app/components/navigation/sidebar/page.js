import Link from "next/link"
import React, {useState, useEffect} from 'react'

const Sidebar = ({
    isOpen,
    toggle,
}) => {
    const [user, setUser] = useState(null)
    const backPort ='3001'

    useEffect(()=>{
        (
          async()=>{
            const response = await fetch(`http://localhost:${backPort}/api/auth`, {
              credentials:'include'
            });
            const content = await response.json()
            setUser(content)
            //console.log(content)
          } 
        )()})

        const handleLogout = async()=>{
            try{
             
              const response = await fetch(`http://localhost:${backPort}/logout`, {
                credentials:'include'
              })
              console.log(response)
      
              if(response.ok){
                //const pastDate = new Date(0)
                //document.cookie = `${name}=; expires=${pastDate.toUTCString()}; path=/login;`
                alert("You are logged out. Redirecting...")
                window.location.href='/'
              }else{
                console.error('Logout failed')
              }
            }catch(err){
              console.log("error lgout", err)
            }
      
        
          }

    return (
        <>
        <div className="sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white grid pt-[120px] left-0 z-10"
        style={{
            opacity: `${isOpen? "1":"0"}`,
            top: `${isOpen ? "0" : "-100%"}`,
        }}
        >
            <button className="absolute right -0 p-5" onClick={toggle}>
                {/* close icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
                </svg>
            </button>

            <ul className="sidebar-nav text-center leading-relaxed text-xl">
            
            <li>
                  {user &&(
                    <Link href={user.account === 'admin'? "/admin": "/user-profile"}>
                      <p>Profile</p>
                </Link>)}
                    
                </li>
                <li>
                        {user? <p onClick={handleLogout} className='cursor-pointer'>Logout</p>:'' }
                </li>

            <li>
                <Link href="/register">
                        {user? '': <p>Register</p>}
                    </Link>
                </li>
                <li>
                    <Link href="/login">
                    {user? '': <p>Sign-in</p>}
                    </Link>
                </li>
        </ul>
        
        </div>
        </>
    )
}

export default Sidebar;
