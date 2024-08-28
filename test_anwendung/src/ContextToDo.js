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

    return (
      <TodoContext.Provider value={{ todos, hoveredTodo, setHoveredTodo, addTodo }}>
        {children}
      </TodoContext.Provider>
    );
  };


