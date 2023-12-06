import React, {useState, useEffect} from 'react'
const backPort = '3001'

const PolicyComponent = ({policyName}) => {
    const [policyText, setPolicyText] = useState('')
    const [updatePolicy, setUpdatePolicy] = useState('')

    useEffect(() => {
        
        const fetchPolicyText = async () => {
          try {
            const response = await fetch(`http://localhost:${backPort}/api/policies/${policyName}`);
            
            if(response.ok){
              const data = await response.json();
              console.log(data)
              console.log(data.policyText)
              setPolicyText(data.policyText);
            } else{
              console.error("Error,", response.status , response.statusText)
            }
            
            
            
          } catch (error) {
            console.error(error);
          }
        };
        fetchPolicyText();
    }, [policyText]);

    const handleUpdate = async()=>{
        try{
            await fetch(`http://localhost:${backPort}/api/policiesU/${policyName}`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  policyText:updatePolicy})
            })
            alert('Policy updated!')
        }catch(error){
            console.error(error)
        }
    }

  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-black rounded shadow">
        <h2 className='text-red-600 text-2xl mb-4'>{policyName}</h2>
        <p className='text-black mb-4'> Text = {policyText}</p>
        <textarea className='w-full p-2 border rounded mb-4' onChange={(e)=>setUpdatePolicy(e.target.value)}/>
        <button className='bg-red-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-900' onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default PolicyComponent;