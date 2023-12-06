import React, {useState, useEffect} from 'react'
const backPort = '3001'

const PolicyComponent = ({policyName}) => {
    const [policyText, setPolicyText] = useState('')

    useEffect(() => {
        
        const fetchPolicyText = async () => {
          try {
            const response = await fetch(`http://localhost:${backPort}/api/policies/${policyName}`);
            const data = await response.json();
            setPolicyText(data.policyText);
          } catch (error) {
            console.error(error);
          }
        };
        fetchPolicyText();
    }, [policyName]);

    const handleUpdate = async()=>{
        try{
            await fetch(`http://localhost:${backPort}/api/policies/${policyName}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({policyText})
            })
            alert('Policy updated!')
        }catch(error){
            console.error(error)
        }
    }

  return (
    <div>
        <h2>{policyName}</h2>
        <textarea value={policyText} onChange={(e)=>setPolicyText(e.target.value)}/>
        <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default PolicyComponent;