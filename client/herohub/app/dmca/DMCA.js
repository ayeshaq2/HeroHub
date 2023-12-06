import React , {useState} from 'react'

export const DMCAPolicy = () => {
    const [policy, setPolicy] = useState('')
    let policyName = 'DMCA and Takedown Policy'

    useEffect(() => {
        
        const fetchPolicyText = async () => {
          try {
            const response = await fetch(`http://localhost:${backPort}/api/policies/${policyName}`);
            
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
    <h1>{policyName}</h1>
    <p>{policy}</p>
    </>
    
  )
}

