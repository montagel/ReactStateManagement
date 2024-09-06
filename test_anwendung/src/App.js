import './App.css';
import React from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDetails from './ToDoDetails';
import { addTodo  } from './ToDoAtoms';
import { useSetAtom} from 'jotai';


function App() {
  // um ein neues Todo hinzuzufügen
  const addNewTodo = useSetAtom(addTodo);

  // Funktion zum Verarbeiten der hochgeladenen JSON-Datei
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json)) {
          json.forEach(todo => {
            addNewTodo(todo);
          });
        } else {
          alert("Die hochgeladene Datei muss ein Array von To-Dos enthalten.");
        }
      } catch (error) {
        alert("Fehler beim Lesen der Datei. Stelle sicher, dass es sich um gültiges JSON handelt.");
      }
    };
  
    reader.readAsText(file);
  };


  return (
    <div>
      <h1>Meine To-Do Liste</h1>
      <input  className="file-upload-input" type="file" accept=".json" onChange={handleFileUpload} />
      <div className="todoApp">
        <div className="todo-container">
          <h3>neue Aufgabe</h3>
          <ToDoForm />
          <h3>Detailinformationen</h3>
          <TodoDetails></TodoDetails>
        </div>
        <ToDoList/>
      </div>
    </div>
  );
}

export default App;
