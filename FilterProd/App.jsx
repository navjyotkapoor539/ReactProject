import { useEffect, useState} from "react";
import {items} from "./items"
import "./App.css";

function App() {
 const filters=['Bags','Watches','Sports','Sunglasses'];
 const [filteredData,setfilteredData]=useState(items);
 const [activeFilters,setActiveFilters]=useState([]);

 const handleFilterClick=(e)=>{
  const category=e.target.id;
  if(activeFilters.includes(category)){ //toggle false
    const filters=activeFilters.filter((el)=>el!==category);
    setActiveFilters(filters);
  }else{
    setActiveFilters([...activeFilters,category]); //toggle true
  }
 }

 const filterProducts=()=>{
  if(activeFilters.length){
    const tempItems=items.filter((item)=>activeFilters.includes(item.category));
    setfilteredData(tempItems);
  }else{
    setfilteredData(items);
  }
 }

 useEffect(()=>{
  filterProducts()
 },[activeFilters])

  return (
    <div className="App">
      <div className="filters" onClick={handleFilterClick}>
      {
        filters.map((item,idx)=>(
          <button className={activeFilters.includes(item)?'selected':""} 
          key={idx} id={item}>{item}</button>
          ))
      }
      </div>

      <div className="product-list">
      {
        filteredData.map((item,idx)=>(
          <div className="item" key={idx}>
           <p>{item.name}</p>
           <p className="category">{item.category}</p>
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default App;