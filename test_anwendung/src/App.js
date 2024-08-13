import './App.css';
import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log("List item added")
  };

  return (
    <div className="todoApp">
    <h1>Meine To-Do Liste</h1>
    <div className="todo-container">
      <ToDoForm addTodo={addTodo} todos={todos}/>
      <ToDoList todos={todos} />
     </div>
    </div>
  );
}

export default App;
