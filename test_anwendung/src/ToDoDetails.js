import React from 'react';
import './ToDoDetails.css'; 

function TodoDetails(todo) {

  if (!todo) {
    return <div className="todo-details">Hover über eine Kachel, um Details zu sehen.</div>;
  }

  return (
    <div className="todo-details">
      <h3>Details zu: {todo.title}</h3>
      <p><strong>Beschreibung:</strong> {todo.description}</p>
      <p><strong>Dauer:</strong> {todo.duration} Minuten</p>
      <p><strong>Wichtigkeit:</strong> {todo.importance} / 10</p>
    </div>
  );
}

export default TodoDetails;
