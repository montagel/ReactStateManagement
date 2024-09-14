import { createContext, useReducer } from 'react';

// Context
export const TodoContext = createContext();
export function TodoContextProvider({ children }) {

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const setImportanceFilter = (importance) => {
    dispatch({ type: 'SET_IMPORTANCE_FILTER', payload: importance });
  };

  const setSortOrder = (order) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: order });
  };

  return (
    <TodoContext.Provider value={{
      todos: state.todos, filteredAndSortedTodos: state.filteredAndSortedTodos,
      importanceFilter: state.importanceFilter, sortOrder: state.sortOrder,
      addTodo, setImportanceFilter, setSortOrder
    }}>
      {children}
    </TodoContext.Provider>

  );
};

// Reducer 
const initialState = {
  todos: [],
  filteredAndSortedTodos: [],
  importanceFilter: 0,
  sortOrder: 'newest',
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      const updatedTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: updatedTodos,
        filteredAndSortedTodos: sortTodos(filterTodos(updatedTodos, 0), 'newest'),
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



