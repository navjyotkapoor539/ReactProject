import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [images,setImages]=useState([]);
  const [index,setIndex]=useState(0);

   const fetchImages=async()=>{
    const url='https://www.reddit.com/r/aww/top/.json?t=all'
    const res=await fetch(url);
    const result=await res.json();
    const data=result.data.children;
   
    const list=data.filter((item)=>
      item.data.url_overridden_by_dest.includes('.jpg')).map((item)=>item.data.url_overridden_by_dest)

      setImages(list);
   }

   useEffect(()=>{
    fetchImages();
   },[])

    const handleClick=(e)=>{
     if(e==='left'){
      if(index===0){
        setIndex(images.length-1);
      }
      else setIndex((ind)=>ind-1);
     }
     else if(e==='right'){
      if(index===images.length-1)
      setIndex(0);
      else setIndex((ind)=>ind+1);
     }
    }

    useEffect(()=>{
      const tid=setInterval(()=>{
        handleClick('right');
      },1000);

      return ()=>{
        clearInterval(tid);
      }
    },[index])

  return (

    <div className="App">
      <button onClick={()=>handleClick('left')}>
        {"<"}
      </button>
      <img src={images[index]} alt='not-found'/>
      <button className="right" onClick={()=>handleClick('right')}>
        {">"}
      </button>

    </div>
  );
}

export default App;
