import React, { useEffect, useState } from 'react'
import "./App.css";
const FAQItem = ({faq,index}) => {
    const [isShow,setIshow]=useState(false);

    useEffect(()=>{
        if(index==0){
            setIshow(true);
        }
    },[])

    const handleClick=()=>{
        setIshow((isShow)=>!isShow)
    }

  return (
    <div className='faq-box'>
      <div className='que' onClick={handleClick}>
        <button className={isShow?'arrow':""}>^</button>
        <div>{faq.question}</div>
      </div>
      {isShow && <div className='ans'>{faq.answer}</div>}
    </div>
  )
}

export default FAQItem
