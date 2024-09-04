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

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      filteredAndSortedTodos: state.filteredAndSortedTodos, importanceFilter: state.importanceFilter, sortOrder: state.sortOrder
      , setTodos,
      setImportanceFilter,
      setSortOrder,
      handleFileUpload
    }}>
      {children}
    </TodoContext.Provider>

  );
};


const initialState = {
  todos: [],
  filteredAndSortedTodos: [],
  importanceFilter: 0,
  sortOrder: 'newest',
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
        filteredAndSortedTodos: sortTodos(filterTodos(action.payload, 0), 'newest'),
        sortOrder: 'newest',
        importanceFilter: 0
      };
    case 'SET_IMPORTANCE_FILTER':
      return {
        ...state,
        importanceFilter: action.payload,
        filteredAndSortedTodos: sortTodos(filterTodos(state.todos, action.payload), state.sortOrder),
      };
    case 'SET_SORT_ORDER':
      return {
        ...state,
        sortOrder: action.payload,
        filteredAndSortedTodos: sortTodos(state.filteredAndSortedTodos, action.payload),
      };
    case 'ADD_TODOS_FROM_FILE':
      const updatedTodos = [...action.payload, ...state.todos];
      return {
        ...state,
        todos: updatedTodos,
        filteredAndSortedTodos: sortTodos(filterTodos(updatedTodos, 0), 'newest'),
        sortOrder: 'newest',
        importanceFilter: 0
      };
    default:
      return state;
  }
}

function filterTodos(todos, importanceFilter) {
  if (importanceFilter === 0) return todos;
  return todos.filter(todo => Number(todo.importance) === importanceFilter);
}

function sortTodos(todos, sortOrder) {
  switch (sortOrder) {
    case 'DurationAscending':
      return todos.sort((a, b) => a.duration - b.duration);
    case 'DurationDescending':
      return todos.sort((a, b) => b.duration - a.duration);
    case 'newest':
      return todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    default:
      return todos;
  }
}



