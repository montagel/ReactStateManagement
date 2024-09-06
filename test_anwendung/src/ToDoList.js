import React from 'react';
import './ToDoList.css';
import ToDoItem from './ToDoItem';
import { useAtom } from 'jotai';
import { importanceFilterAtom, sortOrderAtom, filteredAndSortedTodosAtom} from './ToDoAtoms'


// Liste mit Sortier- und Filtermöglichkeiten
function ToDoList() {

  const [importanceFilter, setImportanceFilter] = useAtom(importanceFilterAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [filteredAndSortedTodos] = useAtom(filteredAndSortedTodosAtom);
 
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
            onChange={(e) => setImportanceFilter(Number(e.target.value))} 
          />
          <div className="sort-by-duration">
            <label>Sortieren: </label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
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
            <ToDoItem key={todo.id} todo={todo}/>
          ))
        )}
      </div>
    </div>
  );
}

export default ToDoList;
