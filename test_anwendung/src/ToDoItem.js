import React from 'react';
import './ToDoItem.css'
import { useDispatch } from 'react-redux';
import { setHoveredTodo } from './redux/todo_slice';

// Einzelnes To-Do-Element mit den wichtigsten Informationen
function ToDoItem({ todo }) {
  
  const dispatch = useDispatch();

  // Zum Formatieren des Datums und der Uhrzeit
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(todo.createdAt);

  return (
    <div className="todo-item" onMouseEnter={() => dispatch(setHoveredTodo(todo))} onMouseLeave={() => dispatch(setHoveredTodo(null))}>
      <h3>{todo.title}</h3>
      <p>Erstelldatum: {formattedDate} </p>
      <p>Erstellzeit: {formattedTime} </p>
      <p>Dauer: {todo.duration} h</p>
      <p>Wichtigkeit: {todo.importance} / 10</p>
    </div>
  );
}

export default React.memo(ToDoItem);