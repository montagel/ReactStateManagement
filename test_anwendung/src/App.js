import './App.css';
import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDetails from './ToDoDetails';
function App() {

  const [todos, setTodos] = useState([]);

  const [hoveredTodo, setHoveredTodo] = useState(null);


  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log("List item added")
  };

  return (
    <div>
      <h1>Meine To-Do Liste</h1>
      <div className="todoApp">
        <div className="todo-container">
        <h3>neue Aufgabe</h3>
          <ToDoForm addTodo={addTodo} todos={todos} />
          <h3>Detailinformationen</h3>
          <TodoDetails todo={hoveredTodo} ></TodoDetails>
        </div>
        <ToDoList setHoveredTodo={setHoveredTodo} todos={todos} />
      </div>
    </div>
  );
}

export default App;
