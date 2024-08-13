import React from 'react';
import './ToDoList.css'

//Hier kommt noch ein weitere Kindkomponente für das Filtern

function ToDoList({ todos }) {
  return (
    <div>
    <h3>Aufgabenliste</h3>
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <p>Noch keine Aufgaben</p>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <h3>{todo.title}</h3>
            <p>Dauer: {todo.duration} h</p>
            <p>Wichtigkeit: {todo.importance} / 10</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default ToDoList;
