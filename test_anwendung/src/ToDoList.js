import React, { useState } from 'react';
import './ToDoList.css';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, setHoveredTodo }) {
  const [importanceFilter, setImportanceFilter] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState(todos);


  const handleImportanceChange = (e) => {
    const newValue = parseInt(e.target.value);
    setImportanceFilter(newValue);
    const updatedTodos = todos.filter(todo => !newValue || Number(todo.importance) === newValue)
    setFilteredTodos([...updatedTodos]);
  };

  const handleSortOrderChange = (e) => {
    const newOrder = e.target.value;
    const updatedTodos = todos.sort((a, b) => newOrder === 'ascending' ? a.duration - b.duration : b.duration - a.duration);
    setFilteredTodos([...updatedTodos]);
  };

  return (
    <div>
      <h3>Aufgabenliste</h3>
      <div className="todo-list-container">
        <div className="filter-by-importance">
          <label>Filtern nach Wichtigkeit: {importanceFilter === 0 ? "alle" : importanceFilter}</label>
          <input 
            type="range" 
            min="0" 
            max="10" 
            value={importanceFilter}
            onChange={handleImportanceChange}
          />
          <div className="sort-by-duration">
            <label>Sortieren nach Dauer: </label>
            <select onChange={handleSortOrderChange}>
              <option value="ascending">Aufsteigend</option>
              <option value="descending">Absteigend</option>
            </select>
          </div>
        </div>      

        {filteredTodos.length === 0 ? (
          <p>Noch keine Aufgaben</p>
        ) : (
          filteredTodos.map((todo, index) => (
            <ToDoItem key={index} todo={todo} setHoveredTodo={setHoveredTodo} />
          ))
        )}
      </div>
    </div>
  );
}

export default ToDoList;
