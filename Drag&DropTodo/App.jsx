import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (updateItem) {
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const copyTask = [...tasks];
        const filtered = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prevTasks) => [...filtered, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTasks((prevTasks) => [...prevTasks, obj]);
      }
      setValue("");
    }
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  const handleDragDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    if (status === TODO) {
      handleDragDrop(TODO);
    } else if (status === DOING) {
      handleDragDrop(DOING);
    } else if (status === DONE) {
      handleDragDrop(DONE);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (task) => {
    let copyTask = [...tasks];
    copyTask = copyTask.filter((it) => it.id !== task.id);
    setTasks(copyTask);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <div className="board">
        <div
          className="todo"
          data-status={TODO}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
          <h2 className="todo-col">Todo</h2>
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task.status === TODO && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span onClick={() => updateTask(task)} className="btn">
                        ✎
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        🗑️
                      </span>
                    </div>
                  </div>
                ),
            )}
        </div>

        <div
          className="doing"
          data-status={DOING}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
          <h2 className="doing-col">Doing</h2>
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task.status === DOING && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span onClick={() => updateTask(task)} className="btn">
                        ✎
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        🗑️
                      </span>
                    </div>
                  </div>
                ),
            )}
        </div>

        <div
          className="done"
          data-status={DONE}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
        >
          <h2 className="done-col">Done</h2>
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task.status === DONE && (
                  <div
                    onDrag={(e) => handleDrag(e, task)}
                    draggable
                    key={task.id}
                    className="task-item"
                  >
                    {task.title}
                    <div>
                      <span onClick={() => updateTask(task)} className="btn">
                        ✎
                      </span>
                      <span onClick={(e) => deleteTask(task)} className="btn">
                        🗑️
                      </span>
                    </div>
                  </div>
                ),
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
