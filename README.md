# Todo List App

This is a simple todo list application built with **HTML, CSS, ReactJS, and Go**. It allows users to manage their tasks efficiently with a Go backend and MongoDB for data storage.

## Features
✅ **Add Tasks** – Users can add new tasks to the list.  
✅ **Delete Tasks** – Users can delete tasks from the list.  
✅ **Mark Tasks as Completed** – Users can mark tasks as completed.  
✅ **Persistent Storage** – Task data is stored in **MongoDB**, allowing users to persist their tasks across sessions.  

## Technologies Used
- **[React](https://reactjs.org/)** – JavaScript library for building user interfaces.  
- **[Go](https://go.dev/)** – Backend language for handling API requests and data processing.  
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database for storing task data.  
- **[Docker](https://www.docker.com/)** – Containerized environment for easy deployment.  

## Usage
### 1. Clone the Repository  
```sh
git clone https://github.com/nehabajjuri/Todo_react.git
```
### 2. Set Up the Backend
Navigate to the backend folder:
```sh
cd backend
```
Create a .env file and configure MongoDB connection:
```sh
MONGO_URI=mongodb://localhost:27017/todo
```
PORT=5000
Install Go dependencies:
```sh
go mod tidy
```
Start the backend server:
```sh
go run main.go
```
### 3. Set Up the Frontend
Navigate to the frontend folder:
```sh
cd ../todolist
```
Install dependencies:
```sh
npm install
```
Start the frontend server:
```sh
npm start
```
### 4. Open the App
Open http://localhost:3000 in your browser.

API Endpoints
Method	Endpoint	Description
POST	/tasks	Add a new task
GET	/tasks	Get all tasks
PUT	/tasks/:id	Update task (mark as complete)
DELETE	/tasks/:id	Delete task
### Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository.
Create a new branch:
git checkout -b feature-name
Make your changes and commit them:
```sh
git commit -m 'Add some feature'
```
Push to the branch:
```sh
git push origin feature-name
```
Submit a pull request.
