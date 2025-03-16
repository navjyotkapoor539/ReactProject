import { useEffect, useState,useRef} from "react";
import "./App.css";

function App() {
  const emptyArr=['','','',''];
  const refs=[useRef(),useRef(),useRef(),useRef()];
  const [inputs,setInputs]=useState(emptyArr);
  const [missing,setMissing]=useState(emptyArr);
  const CODE='1234';

  const handleSubmit=()=>{
    const missed=inputs.map((item,i)=>{
      if(item==='')
        return i;
    }).filter((item)=>(item || item===0));
    setMissing(missed);

    if(!missed.length){
    const userInput=inputs.join('');
    const isMatch=userInput===CODE;
    const msg=isMatch?"Code is Valid":"Code is Not Valid";
    alert(msg);
    }
  }

  useEffect(()=>{
    refs[0].current.focus();
  },[])

  const handleInputChange=(e,index)=>{
    const val=e.target.value;
    if(!Number(val))
      return;

    if(index<inputs.length-1){
      refs[index+1].current.focus();
    }
    
    const copyInputs=[...inputs];
    copyInputs[index]=val;
    setInputs(copyInputs);
  }

  const handleOnKeyDown=(e,index)=>{
    if(e.keyCode===8){
      const copyInputs=[...inputs];
      copyInputs[index]='';
      setInputs(copyInputs);

      if(index>0){
        refs[index-1].current.focus();
      }
    }
  }

  const handlePaste=(e)=>{
    const data=e.clipboardData.getData('text');
    if(!Number(data) || data.length!==inputs.length)
      return;

    const pasteCode=data.split('');
    setInputs(pasteCode);
    refs[inputs.length-1].current.focus();
  }



  return (
    <div className="App">
      <h1>Two factor code input</h1>
      <div>
      {
        emptyArr.map((item,i)=>{
          return <input
           value={inputs[i]}
           key={i}
           ref={refs[i]}
           type="text"
           maxLength="1"
           onChange={(e)=>handleInputChange(e,i)}
           onKeyDown={(e)=>handleOnKeyDown(e,i)}
           onPaste={handlePaste}
           className={missing.includes(i) ? 'error' : ''}
          />
        })
      }
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;