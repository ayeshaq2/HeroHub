import React , {useState} from 'react'

export const AUPPolicy = () => {
    const [policy, setPolicy] = useState('')
    let policyName = 'Acceptable Use Policy'

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
    <h1>Acceptable Use Policy</h1>
    <p>{policy}</p>
    </>
    
  )
}

