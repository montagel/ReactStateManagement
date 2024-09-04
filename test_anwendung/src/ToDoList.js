import React, { useContext } from 'react';
import './ToDoList.css';
import ToDoItem from './ToDoItem';
import { TodoContext } from './ContextToDo';

function ToDoList({setHoveredTodo}) {

  const { filteredAndSortedTodos, importanceFilter, sortOrder, setImportanceFilter, setSortOrder } = useContext(TodoContext);

  // Filtern nach Wichtigkeit
  const handleImportanceChange = (e) => {
    const importanceValue = parseInt(e.target.value);
    setImportanceFilter(importanceValue);
  };

  // Sortieren der To-Do-Elemente
  const handleSortOrderChange = (e) => {
    const sortValue = e.target.value;
    setSortOrder(sortValue);
  };

  return (
    <div>
      <h3>Aufgabenliste</h3>
      <div className="todo-list-container">
        <div className="filter">
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
              <option value="DurationAscending">nach Dauer aufsteigend</option>
              <option value="DurationDescending">nach Dauer absteigend</option>
              <option value="newest">Neuste zuerst</option>
              <option value="oldest">Älteste zuerst</option>
            </select>
          </div>
        </div>
        {filteredAndSortedTodos.length === 0 ? (
          <p>Noch keine Aufgaben</p>
        ) : (
          filteredAndSortedTodos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} setHoveredTodo={setHoveredTodo}/>
          ))
        )}
      </div>
    </div>
  );
}

export default React.memo(ToDoList);
