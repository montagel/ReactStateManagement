import { createContext, useReducer, useContext } from 'react';

export const TodoContext = createContext();
export const TodoDetailsContext = createContext();



export function TodoDetailsContextProvider({ children }) {
  const setHoveredTodo = (todo) => {
    dispatchHover({ type: 'SET_HOVERED_TODO', payload: todo });
  };
  const [hoverState, dispatchHover] = useReducer(hoverReducer, initialHoverState);

  return (<TodoDetailsContext.Provider value={{
    hoveredTodo: hoverState.hoveredTodo, setHoveredTodo,
  }}>
    {children}
  </TodoDetailsContext.Provider>

  );

}



export function TodoContextProvider({ children }) {

  const [state, dispatch] = useReducer(todoReducer, initialState);
  //const [hoveredTodo, setHoveredTodo] = useContext(null);

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
      filteredTodos: state.filteredTodos, importanceFilter: state.importanceFilter, sortOrder: state.sortOrder
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
  filteredTodos: [],
  importanceFilter: 0,
  sortOrder: 'newest',
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


const initialHoverState = {
  hoveredTodo: null
};

function hoverReducer(state, action) {
  switch (action.type) {
    case 'SET_HOVERED_TODO':
      return {
        ...state,
        hoveredTodo: action.payload,
      };
    default:
      return state;
  }
}


