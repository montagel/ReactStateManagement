import React from 'react';
import './ToDoItem.css'


function ToDoItem({todo, setHoveredTodo}) {


  return (
    <div  className="todo-item" onMouseEnter={() => setHoveredTodo(todo)} onMouseLeave={() => setHoveredTodo(null)}>
     <h3>{todo.title}</h3>
     <p>Dauer: {todo.duration} h</p>
     <p>Wichtigkeit: {todo.importance} / 10</p> 
    </div>
  );
}

export default ToDoItem;
