import { useEffect, useState } from 'react'
import "./App.css";

function App() {
 
 const [isStart,setIsStart]=useState(false);
 const [isPaused,setIsPaused]=useState(false);
 const [hour,setHour]=useState(0);
 const [minute,setMinute]=useState(0);
 const [second,setSecond]=useState(0);
 const [timerId,setTimerId]=useState(0);

 const handleStart=()=>{
  if(hour<0||minute<0 ||second<=0){
    alert("Invalid input");
    return;
  }else
  setIsStart(true);
 }

 const handlePause=()=>{
  setIsPaused(true);
  clearInterval(timerId);
 }

const handleResume=()=>{
  setIsPaused(false);
  runTimer(second,minute,hour);
}

 const handleReset=()=>{
  setIsStart(false);
  setHour(0);
  setMinute(0);
  setSecond(0);
  clearInterval(timerId);
 }

 const handleInput=(e)=>{
  const value=parseInt(e.target.value);
  const id=e.target.id;
  if(id==='hours'){
    setHour(value);
  }
  else if(id==='minutes'){
    setMinute(value);
  }
  else{
    setSecond(value);
  }
 }

 const runTimer=(sec,min,hr,tid)=>{
  if(sec>0){
    setSecond((s)=>s-1);
  }else if(sec===0 && min>0){
    setMinute((m)=>m-1);
    setSecond(59);
  }
  else{
    setHour((h)=>h-1)
    setMinute(59);
    setSecond(59);
  }
  if(sec===0 && min===0 && hr===0){
    handleReset();
    alert("Timer is finished");
    return;
  }
 }

 useEffect(()=>{
  let tid;
  if(isStart){
    tid=setInterval(()=>{
      runTimer(second,minute,hour,tid);
    },1000)
    setTimerId(tid);
  }
  return ()=>{
    clearInterval(tid);
  }
 },[isStart,hour,minute,second])

  return (
    <div className='App'>
      <h1>Countdown Timer</h1>
     {
      !isStart &&  (<div className='input-container'>
      <div className='input-box'>
        <input onChange={handleInput} id='hours' placeholder='HH' />
        <input onChange={handleInput} id='minutes' placeholder="MM" />
        <input onChange={handleInput} id='seconds' placeholder="SS"/>
      </div>
      <button onClick={handleStart} className='timer-button'>Start</button>
      </div>)
     }

      {
      isStart && (<div className='show-container'>
      <div className='timer-box'>
      <div>{hour<10 ? `0${hour}`:hour}</div>
      <span>:</span>
      <div>{minute<10 ?`0${minute}`:minute}</div>
      <span>:</span>
      <div>{second<10 ?`0${second}`:second}</div>
      </div>
  
      <div className='action-box'>
      {
        !isPaused &&  <button onClick={handlePause} className='timer-button'>Pause</button>
      }
      {
        isPaused &&  <button onClick={handleResume} className='timer-button'>Resume</button>
      }
      <button onClick={handleReset} className='timer-button'>Reset</button>
       </div>
      </div>)
      }

    </div>
  )
}

export default App