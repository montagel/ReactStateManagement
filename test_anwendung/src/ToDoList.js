import React, { useEffect } from 'react';
import './ToDoList.css'
import { useState } from 'react';
import ManageToDoItems from './ManageToDoItems';


function ToDoList({ todos, setHoveredTodo}) {
  const [importanceFilter, setImportanceFilter] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState(todos); // Zustand für die gefilterte Liste
  const [sortOrder, setSortOrder] = useState('ascending'); // 'ascending' oder 'descending'
   
  useEffect(() => {  
    // Filtere die Aufgaben, es sei denn, importanceFilter ist 0 (zeigt alle Aufgaben an)
    let updatedTodos = importanceFilter === 0 
    ? todos
    : todos.filter(todo => {
        return Number(todo.importance) === importanceFilter;
      });


    if (sortOrder === 'ascending') {
      updatedTodos.sort((a, b) => a.duration - b.duration);
    } else if (sortOrder === 'descending') {
      updatedTodos.sort((a, b) => b.duration - a.duration);
    }

    setFilteredTodos(updatedTodos); 
  }, [importanceFilter, sortOrder, todos]);
 

  return (
    <div>
    <h3>Aufgabenliste</h3>
    <div className="todo-list-container">
    <ManageToDoItems setSortOrder={setSortOrder}  setImportanceFilter={setImportanceFilter} importanceFilter={importanceFilter}></ManageToDoItems>
      {filteredTodos.length === 0 ? (
        <p>Noch keine Aufgaben</p>
      ) : (
        filteredTodos.map((todo, index) => (
          <div key={index} className="todo-item" onMouseEnter={() => setHoveredTodo(todo)} onMouseLeave={() => setHoveredTodo(null)}>
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
