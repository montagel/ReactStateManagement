import { createContext, useReducer } from 'react';

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const setTodos = (todos) => {
    dispatch({ type: 'SET_TODOS', payload: todos });
  };

  const setImportanceFilter = (importance) => {
    dispatch({ type: 'SET_IMPORTANCE_FILTER', payload: importance });
  };

  const setSortOrder = (order) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: order });
  };

  const setHoveredTodo = (todo) => {
    dispatch({ type: 'SET_HOVERED_TODO', payload: todo });
  };


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json)) {
          dispatch({ type: 'ADD_TODOS_FROM_FILE', payload: json });
        } else {
          alert("Die hochgeladene Datei muss ein Array von To-Dos enthalten.");
        }
      } catch (error) {
        alert("Fehler beim Lesen der Datei. Stelle sicher, dass es sich um gültiges JSON handelt.");
      }
    };

    reader.readAsText(file);
  };


  /*
    // Liste der To-Dos   
    const [todos, setTodos] = useState([]);

    // Für das aktuell durch den User hervorgehobene To-Do-Element
    const [hoveredTodo, setHoveredTodo] = useState(null);

    // Funktion zum Hinzufügen eines neuen To-Dos zur Liste
    const addTodo = (todo) => { 
      const newTodos = [todo, ...todos];
      setTodos(newTodos);
      console.log("List item added")
    }; */

  // ToDo-Elemente aus einer JSON-Datei auslesen und hinzufügen
  /*const handleFileUpload = (event) => {
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
  };*/

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      filteredTodos: state.filteredTodos, importanceFilter: state.importanceFilter, hoveredTodo: state.hoveredTodo, sortOrder: state.sortOrder,
      setTodos,
      setImportanceFilter,
      setSortOrder,
      setHoveredTodo,
      handleFileUpload
    }}>
      {children}
    </TodoContext.Provider>
  );
};


const initialState = {
  todos: [],
  filteredTodos: [],
  importanceFilter: 0,
  sortOrder: 'newest',
  hoveredTodo: null
};


function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
        filteredTodos: sortAndFilterTodos(action.payload, 'newest', 0),
        sortOrder: 'newest',
        importanceFilter: 0
      };
    case 'SET_IMPORTANCE_FILTER':
      return {
        ...state,
        importanceFilter: action.payload,
        filteredTodos: sortAndFilterTodos(state.todos, state.sortOrder, action.payload),
      };
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload,
        filteredTodos: sortAndFilterTodos(state.todos, action.payload, state.importanceFilter),
      };
    case 'ADD_TODOS_FROM_FILE':
      return {
        ...state,
        todos: [...action.payload, ...state.todos],
        filteredTodos: sortAndFilterTodos([...action.payload, ...state.todos], 'newest', 0),
        sortOrder: 'newest',
        importanceFilter: 0
      };
    case 'SET_HOVERED_TODO':
      return {
        ...state,
        hoveredTodo: action.payload,
      };
    default:
      return state;
  }
}

function sortAndFilterTodos(todos, sortOrder, importanceFilter) {
  let filteredTodos = todos;

  if (importanceFilter !== 0) {
    filteredTodos = todos.filter(todo => Number(todo.importance) === importanceFilter);
  }

  if (sortOrder === 'DurationAscending') {
    return filteredTodos.sort((a, b) => a.duration - b.duration);
  } else if (sortOrder === 'DurationDescending') {
    return filteredTodos.sort((a, b) => b.duration - a.duration);
  } else if (sortOrder === 'newest') {
    return filteredTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === 'oldest') {
    return filteredTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  return filteredTodos;
}



