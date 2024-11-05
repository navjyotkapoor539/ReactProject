import { useEffect, useState } from 'react'
//import "./App.css";

function App() {

  const [principal,setPrincipal]=useState(0);
  const [interest,setInterest]=useState(0);
  const [years,setYears]=useState(0);
  const [emi,setEmi]=useState(0);

  const handleChange=(e)=>{
   const id= e.target.id
   const value=parseInt(e.target.value)

   if(id==='principle'){
    setPrincipal(value);
   }
   else if(id==='interest'){
    setInterest(value);
   }
   else{
    setYears(value);
   }
  }

  const calculateEMI=()=>{
    let r=interest;
    if(principal && r && years){
      r=r/12/100;
      const calcPow=Math.pow(1+r,years*12);
      const amount=principal*((r*calcPow)/(calcPow-1));
      setEmi(Math.round(amount));
    }
  }

  useEffect=(()=>{
    calculateEMI();
  },[principal,interest,years])

  return (
    <div className='loan-calc'>
    <h1>Mortgage Calculator</h1>

    <div className='inputes'>
      <p>Principle</p>
      <input onChange={handleChange} type="number" id='principle'/>

      <p>Interest</p>
      <input onChange={handleChange} type="number" id='interest'/>

      <p>Years</p>
      <input onChange={handleChange} type="number" id='year'/>
    </div>

    <div className='output'>
      Your EMI is {emi};
    </div>
    </div>
  )
}

export default App