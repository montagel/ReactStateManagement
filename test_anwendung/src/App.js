import './App.css';
import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDetails from './ToDoDetails';


function App() {

  // Liste der To-Dos
  const [todos, setTodos] = useState([]);
  // Für das aktuell durch den User hervorgehobene To-Do-Element
  const [hoveredTodo, setHoveredTodo] = useState(null);

  // Funktion zum Hinzufügen eines neuen To-Dos zur Liste
  const addTodo = (todo) => {
    // Ein neues To-Do wird an den Anfang der bestehenden Liste angefügt
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  // Funktion zum Verarbeiten der hochgeladenen JSON-Datei
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json)) {
          setTodos(json);
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
          <ToDoForm addTodo={addTodo} todos={todos} />
          <h3>Detailinformationen</h3>
          <TodoDetails todo={hoveredTodo} ></TodoDetails>
        </div>
        <ToDoList setHoveredTodo={setHoveredTodo} todos={todos} />
      </div>
    </div>
  );
}

export default App;
