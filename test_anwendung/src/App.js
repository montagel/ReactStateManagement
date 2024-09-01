import './App.css';
import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDetails from './ToDoDetails';
import { useContext } from 'react';
import { TodoContext } from './ContextToDo';

function App() {

  const { handleFileUpload } = useContext(TodoContext);

  return (
    <div>
      <h1>Meine To-Do Liste</h1>
      <input className="file-upload-input" type="file" accept=".json" onChange={handleFileUpload} />
      <div className="todoApp">
        <div className="todo-container">
          <h3>neue Aufgabe</h3>
          <ToDoForm />
          <h3>Detailinformationen</h3>
          <TodoDetails></TodoDetails>
        </div>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
