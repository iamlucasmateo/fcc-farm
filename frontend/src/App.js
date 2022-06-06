import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './components/todoList';
import { getTodos, postTodo, deleteTodo } from './utils'

function App() {
  const [todoList, setTodoList] = useState([{}]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const deleteTaskCallback = async (itemTitle) => {
    await deleteTodo(itemTitle);
    const todos = await getTodos();
    setTodoList(todos);
  }

  const onAddTaskClick = async () => {
    await postTodo(title, description);
    setTitle("");
    setDescription("");
    const todos = await getTodos();
    setTodoList(todos);
  }

  const onTitleChange = (titleInputEvent) => {
    const value = titleInputEvent.target.value;
    setTitle(value);
  }

  const onDescriptionChange = (descriptionInputEvent) => {
    const value = descriptionInputEvent.target.value;
    setDescription(value);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();  
      setTodoList(fetchedTodos);
    }
    fetchTodos();
  }, [])

  return (
    <div className="App">
      <div 
        className="App list-group-item justify-content-center align-items-center mx-auto"
        style={{
          "width": "400px",
          "backgroundColor": "white",
          "marginTop": "15px",
        }}
      >
        <h1
          className="card text-white bg-primary mb-1"
          style={{maxWidth: "20rem"}}
        >
          Task Manager
        </h1>
        <h6
          className="card text-white bg-primary mb-3"
        >
          FastAPI - React - MongoDB
        </h6>
        <div className="card-body">
          <h5 className="card text-white bg-dark mb-3">
            Add Your Task
          </h5>
          <span>
            <input 
              className="mb-2 form-control titleIn"
              placeholder="Title"
              onChange={onTitleChange}
            />
            <input 
              className="mb-2 form-control descriptionIn"
              placeholder="Description"
              onChange={onDescriptionChange}
            />
            <button 
              className="btn btn-outline-primary mx-2 mb-2"
              style={{
                "borderRadius": "50px",
                "fontWeight": "bold"
              }}
              onClick={onAddTaskClick}
            >
              Add task
            </button>
          </span>
        </div>
        <div className="card-body">
            <h5 className="card text-white bg-dark mb-3">
              All tasks
            </h5>
          <TodoList items={todoList} deleteTaskCallback={deleteTaskCallback}/>
        </div>
      </div>
    </div>
  );
}

export default App;
