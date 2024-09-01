import React from 'react';
import './ToDoList.css';
import ToDoItem from './ToDoItem';
import { useSelector, useDispatch } from 'react-redux';
import { setSortOrder, setImportanceFilter } from './redux/todo_slice';

function ToDoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector((state) => state.todos.filteredAndSortedTodos);
  const importanceFilter = useSelector((state) => state.todos.importanceFilter);
  const sortOrder = useSelector((state) => state.todos.sortOrder);

  // Filtern nach Wichtigkeit
  const handleImportanceChange = (e) => {
    dispatch(setImportanceFilter(parseInt(e.target.value)));
  };

  // Sortieren der To-Do-Elemente
  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
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
              <option value="newest">Neueste zuerst</option>
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
