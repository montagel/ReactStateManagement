import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import ToDoItem from './ToDoItem';
import { useContext } from 'react';
import { TodoContext } from './ContextToDo';


// Liste mit Sortier- und Filtermöglichkeiten
function ToDoList() {

  const { todos } = useContext(TodoContext);

  // Um To-Do-Elemente anhand ihrer Wichtigkeit (1-10) zu filtern (bei 0 wird nicht gefiltert)
  const [importanceFilter, setImportanceFilter] = useState(0);
  // Zum Sortieren der To-Do-Elemente nach Aufgabendauer und Erstelldatum
  const [sortOrder, setSortOrder] = useState('newest');
  // Für die Wiedergabe der gefilterten To-Do-Liste
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Sobald ein neuer To-Do-Element ergänzt wird, wird der Default-Zustand verwendet
  useEffect(() => {
    let updatedTodos = filterTodos(todos, 0);
    updatedTodos = sortTodos(updatedTodos, "newest");
    setFilteredTodos(updatedTodos);
    setImportanceFilter(0);
    setSortOrder("newest");
  }, [todos]);

  // Filtern nach Wichtigkeit
  const handleImportanceChange = (e) => {
    const importanceValue = e.target.value;
    setImportanceFilter(parseInt(importanceValue));
    let updatedTodos = filterTodos(todos, parseInt(importanceValue));
    updatedTodos = sortTodos(updatedTodos, sortOrder);
    setFilteredTodos(updatedTodos);
  };

  // Sortieren der To-Do-Elemente
  const handleSortOrderChange = (e) => {
    const sortValue = e.target.value;
    setSortOrder(sortValue);
    const updatedTodos = sortTodos(filteredTodos, sortValue)
    setFilteredTodos(updatedTodos)
  };

  // Hilfsfunktion zum Filtern der Todos
  const filterTodos = (todos, importanceFilter) => {
    if (importanceFilter === 0) {
      return todos; // Keine Filterung, alle Todos werden angezeigt
    }
    return todos.filter(todo => Number(todo.importance) === importanceFilter);
  };

  // Hilfsfunktion zum Sortieren der Todos
  const sortTodos = (todos, sortOrder) => {
    let todosCopy = [...todos];
    if (sortOrder === 'DurationAscending') {
      return todosCopy.sort((a, b) => a.duration - b.duration);
    } else if (sortOrder === 'DurationDescending') {
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
        {filteredTodos.length === 0 ? (
          <p>Noch keine Aufgaben</p>
        ) : (
          filteredTodos.map((todo) => (
            <ToDoItem key={todo.id} todo={todo}/>
          ))
        )}
      </div>
    </div>
  );
}

export default ToDoList;
