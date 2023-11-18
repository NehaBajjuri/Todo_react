import React, { useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
 const[allTodos,setTodos] = useState([]);
 const[newTitle,setNewTitle]= useState("");
 const[newDescription,setnewDescription] = useState("");

 const handleAddTodo = ()=>{
  let newTodoItem = {
    title:newTitle,
    description:newDescription
  }
  let updatedTodoArr =[...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);


 }




  return (
    <div className="App">
      <h1>My To-do's </h1>
      <div className="wrap">
        <div className="input">
          <div className="input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Got a task ? Add it;)" />
          </div>
          <div className="input-item">
            <label>Goal/Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="What's happening?" />
          </div>
          <div className="input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {allTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key = {index}>
           <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
         </div>
          
          <div>
           <MdDelete className="icon"/>
           <BsCheckLg className="check-icon"/>
          </div>
          </div>
            )
          })}
          </div>
        </div>
      </div>
    
  );
}

export default App;
