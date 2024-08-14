import React, { useEffect } from 'react';
import './ToDoList.css'
import { useState } from 'react';
import ManageToDoItems from './ManageToDoItems';
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, setHoveredTodo} from './redux/slices/toDoSlice';

//Hier kommt noch ein weitere Kindkomponente für das Filtern

function ToDoList() {

  const todos = useSelector((state) => state.todos.todos)
  const importanceFilter = useSelector((state) => state.todos.importanceFilter)
  const dispatch = useDispatch()
  const sortOrder = useSelector((state) => state.todos.setOrder)



  const selectFilteredTodos = (state) => {
    let filteredTodos = state;
  
    // Filter nach Wichtigkeit
    if (importanceFilter > 0) {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.importance === importanceFilter
      );
    }
  
    // Sortieren nach Dauer
    if (sortOrder === 'ascending') {
      filteredTodos.sort((a, b) => a.duration - b.duration);
    } else if (sortOrder === 'descending') {
      filteredTodos.sort((a, b) => b.duration - a.duration);
    }
  
    return filteredTodos;
  };
let filteredTodos = selectFilteredTodos(todos)

 
  // Filtere die Aufgaben, es sei denn, importanceFilter ist 0 (zeigt alle Aufgaben an)
 

  return (
    <div>
    <h3>Aufgabenliste</h3>
    <div className="todo-list-container">
    <ManageToDoItems></ManageToDoItems>
      {filteredTodos.length === 0 ? (
        <p>Noch keine Aufgaben</p>
      ) : (
        filteredTodos.map((todo, index) => (
          <div key={index} className="todo-item" onMouseEnter={() => dispatch(setHoveredTodo(todo))} onMouseLeave={() => setHoveredTodo(null)}>
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
