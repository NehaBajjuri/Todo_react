import React, { useState,useEffect } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
 const[allTodos,setTodos] = useState([]);
 const[newTitle,setNewTitle]= useState("");
 const[newDescription,setnewDescription] = useState("");
 const [completedTodos,setCompletedTodos] = useState([]);

 const handleAddTodo = ()=>{
  let newTodoItem = {
    title:newTitle,
    description:newDescription
  }
  let updatedTodoArr =[...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);
  localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));//stores array as a string
  
 };

const handleDeleteTodo = (index)=>
{
  let reducedTodo = [...allTodos];
  reducedTodo.splice(index);
  localStorage.setItem('todolist',JSON.stringify(reducedTodo));
  setTodos(reducedTodo);
};
const handleComplete =(index)=>{
  let now = new Date();
  let dd = now.getDate();
 let mm = now.getMonth()+1;
 let yyyy = now.getFullYear();
 let h = now.getHours();
 let m = now.getMinutes();
 let s = now.getSeconds();

 let completedOn = dd + '-'+mm+'-'+yyyy+' at '+h+':'+m+':'+s;

 let filteredItem = {
  ...allTodos[index],completedOn:completedOn
 };

 let updatedCompletedArr = [...completedTodos];
 updatedCompletedArr.push(filteredItem);
 setCompletedTodos(updatedCompletedArr);
 handleDeleteTodo(index);
 localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
}
const handleDeleteCompletedTodo =(index)=>
{
  let reducedTodo = [...completedTodos];
  reducedTodo.splice(index);
  localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo);
}

useEffect(()=>{
  let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
  if(savedTodo)
  {
    setTodos(savedTodo);
  }
if(savedCompletedTodo)
{
  setCompletedTodos(savedCompletedTodo);
}
},[])


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

          {isCompleteScreen===false && allTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key = {index}>
           <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
         </div>
          
          <div>
           <MdDelete className="icon" onClick={()=>
           handleDeleteTodo(index)
           
           }/>
           <BsCheckLg className="check-icon" onClick={()=>
          handleComplete(index)
          }/>
          </div>
          </div>
            )
          })}
          {isCompleteScreen===true && completedTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key = {index}>
           <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><i>Completed on :{item.completedOn}</i></p>
         </div>
          
          <div>
           <MdDelete className="icon" onClick={()=>
           handleDeleteCompletedTodo(index)
           
           }/>
          
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
