
import './App.css';

function App() {
  return (
    <div className="App">
   <h1>My To-do's </h1>
   <div className='wrap'>
    <div className='input'>
     <div className='input-item'>
      <label>Title</label>
      <input type="text" placeholder="Got a task ? Add it;)"/>
     </div>
     <div className='input-item'>
      <label>Goal/Description</label>
      <input type ="text" placeholder="What's happening?"/>
     </div>
      <div className = 'input-item'>
       <button type="button" className='PrimaryBtn'>Add</button>
      </div>
    </div>

    <div className='btn-area'>
      <button>Todo</button>
      <button>Completed</button>
    </div>
    <div className = 'todo-list'>
      <div className ='todo-list-item'>
        <h1>Task</h1>
        <h2>Description</h2>
      </div>

    </div>

   </div>
    </div>
  );
}

export default App;
