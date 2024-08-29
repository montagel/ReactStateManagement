import './App.css';
import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDetails from './ToDoDetails';
import { TodoContextProvider } from './ContextToDo';


function App() {

  return (
    <TodoContextProvider>
    <div>
      <h1>Meine To-Do Liste</h1>
      <div className="todoApp">
        <div className="todo-container">
          <h3>neue Aufgabe</h3>
          <ToDoForm/>
          <h3>Detailinformationen</h3>
          <TodoDetails></TodoDetails>
        </div>
        <ToDoList/>
      </div>
    </div>
    </TodoContextProvider>
  );
}

export default App;
