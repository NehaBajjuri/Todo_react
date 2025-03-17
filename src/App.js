import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

const API_URL = "http://localhost:8080/tasks";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]); // Initialize as empty array
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]); // Initialize as empty array

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data || []); // Use default value if response.data is null
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // Set to empty array in case of error
    }
  };

  // Fetch completed todos from backend
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}?completed=true`);
      setCompletedTodos(response.data || []); // Use default value if response.data is null
    } catch (error) {
      console.error("Error fetching completed todos:", error);
      setCompletedTodos([]); // Set to empty array in case of error
    }
  };

  // Add a new todo
  const handleAddTodo = async () => {
    if (!newTitle || !newDescription) {
      alert("Title and Description are required!");
      return;
    }

    const newTodoItem = { title: newTitle, description: newDescription, completed: false };

    try {
      const response = await axios.post(API_URL, newTodoItem);
      setTodos((prevTodos) => [...prevTodos, response.data]); // Update state with new todo
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Mark as completed
 // Mark as completed
const handleComplete = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/complete`);
    if (response.status === 200) {
      // Remove the task from allTodos
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      // Fetch completed todos to update the completed section
      fetchCompletedTodos();
    }
  } catch (error) {
    console.error("Error marking todo as complete:", error);
  }
};

  // Delete from completed todos
  const handleDeleteCompletedTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCompletedTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting completed todo:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
    fetchCompletedTodos();
  }, []);

  return (
    <div className="App">
      <h1>My To-do's</h1>
      <div className="wrap">
        <div className="input">
          <div className="input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Got a task? Add it ;)"
            />
          </div>
          <div className="input-item">
            <label>Goal/Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's happening?"
            />
          </div>
          <div className="input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {!isCompleteScreen &&
            allTodos.map((item) => (
              <div className="todo-list-item" key={item.id}>
                <div>
                  <h3>{item.title || "Untitled Task"}</h3>
                  <p>{item.description || "No description"}</p>
                </div>
                <div>
                  <MdDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(item.id)}
                  />
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(item.id)}
                  />
                </div>
              </div>
            ))}

          {isCompleteScreen &&
            completedTodos.map((item) => (
              <div className="todo-list-item" key={item.id}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p>
                    <i>Completed on: {item.completedOn}</i>
                  </p>
                </div>
                <div>
                  <MdDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(item.id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;