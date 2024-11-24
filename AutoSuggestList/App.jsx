import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [food, setFood] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handleInput = (e) => {
    setFood(e.target.value);
  };

  const fetchItems = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`;
    const result = await fetch(url);
    const data = await result.json();
    setShoppingList(data);
  };

  useEffect(() => {
    if (food.length >= 2) {
      fetchItems(food);
    }
  }, [food]);

  const handleShoppingList = (e) => {
    const ind = e.target.getAttribute("data-id");
    if (ind) {
      const obj = {
        id: Date.now(),
        data: shoppingList[ind],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood("");
  };

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  };

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id != id);
    setBucketList(newList);
  };

  return (
    <div className="App">
      <h1>My Shopping List</h1>
      <div>
        <input value={food} onChange={handleInput} />
      </div>

      {food.length >= 2 ? (
        <div onClick={handleShoppingList} className="shopping-list">
          {shoppingList.map((item, index) => {
            return (
              <div data-id={index} className="product">
                {item}
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="bucket">
        {bucketList.map((item) => {
          return (
            <div className="shopping-item">
              <button onClick={() => handleRightClick(item.id)}>✓</button>
              <div className={item.isDone ? "strik" : ""}>{item.data}</div>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
