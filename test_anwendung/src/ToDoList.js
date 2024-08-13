import React from 'react';
import './ToDoList.css'

function ToDoList({ todos }) {
  return (
    <div className="todo-list-container">
      {todos.map((todo, index) => (
        <div key={index} className="todo-item">
          {todo.text}
        </div>
      ))}
    </div>
  );
}

export default ToDoList;
