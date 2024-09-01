import { createContext, useState } from 'react';

export const TodoContext = createContext();

export function TodoContextProvider ({ children }) {

  // Liste der To-Dos   
  const [todos, setTodos] = useState([]);

  // Für das aktuell durch den User hervorgehobene To-Do-Element
  const [hoveredTodo, setHoveredTodo] = useState(null);

  // Funktion zum Hinzufügen eines neuen To-Dos zur Liste
  const addTodo = (todo) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    console.log("List item added")
  };

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
      <TodoContext.Provider value={{ todos, hoveredTodo, setHoveredTodo, addTodo, handleFileUpload }}>
        {children}
      </TodoContext.Provider>
    );
  };


