import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import ToDoItem from './ToDoItem';

function ToDoList({ todos, setHoveredTodo }) {
  const [importanceFilter, setImportanceFilter] = useState(0);
  const [sortOrder, setSortOrder] = useState('ascending');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    setImportanceFilter(0)
    let updatedTodos = filterTodos(todos, 0);
    updatedTodos = sortTodos(updatedTodos, "newest");    
    setSortOrder("newest");
    setFilteredTodos(updatedTodos);
  }, [todos]); 

  const handleImportanceChange = (e) => {
    setImportanceFilter(parseInt(e.target.value));
    let updatedTodos = filterTodos(todos, parseInt(e.target.value))
    updatedTodos = sortTodos(updatedTodos, sortOrder)
    setFilteredTodos(updatedTodos)
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    const updatedTodos= sortTodos(filteredTodos, e.target.value)
    setFilteredTodos(updatedTodos)
  };

  // Hilfsfunktion zum Filtern der Todos
  const filterTodos = (todos, importanceFilter) => {
    console.log("nach Wichtigkeit filtern");
    if (importanceFilter === 0) {
      return todos; // Keine Filterung, alle Todos werden angezeigt
    }
    return todos.filter(todo => Number(todo.importance) === importanceFilter);
  };

  // Hilfsfunktion zum Sortieren der Todos
  const sortTodos = (todos, sortOrder) => {
    console.log("sortieren");
    let todosCopy = [...todos];
    if (sortOrder === 'ascending') {
      return todosCopy.sort((a, b) => a.duration - b.duration);
    } else if (sortOrder === 'descending') {
      return todosCopy.sort((a, b) => b.duration - a.duration);
    } else if (sortOrder === 'newest') {
      return todosCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Neueste zuerst
    } else if (sortOrder === 'oldest') {
      return todosCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Älteste zuerst
    }
    return todosCopy;
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
            <label>Sortieren: </label>
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="ascending">nach Dauer aufsteigend</option>
              <option value="descending">nach Dauer absteigend</option>
              <option value="newest">Neuste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
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
