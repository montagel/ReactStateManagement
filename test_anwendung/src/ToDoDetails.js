import React from 'react';
import './ToDoDetails.css';
import useTodoStore from './ToDoStore';

// Detailinformationen eines To-Do-Elements aus der Liste
function TodoDetails() {
  const hoveredTodo = useTodoStore((state) => state.hoveredTodo);

  // Wenn kein To-Do-Element ausgewählt wurde, wird eine Standardnachricht angezeigt
  if (!hoveredTodo) {
    return <div className="todo-details">Hover über eine Kachel, um Details zu sehen.</div>;
  }

  return (
    <div className="todo-details">
      <h3>Details zu: {hoveredTodo.title}</h3>
      <p><strong>Beschreibung:</strong> {hoveredTodo.description}</p>
      <p><strong>Dauer:</strong> {hoveredTodo.duration} h</p>
      <p><strong>Wichtigkeit:</strong> {hoveredTodo.importance} / 10</p>
    </div>
  );
}

export default TodoDetails;
