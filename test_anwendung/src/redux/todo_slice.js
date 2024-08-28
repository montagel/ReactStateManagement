import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  hoveredTodo: null,
  importanceFilter: 0,
  sortOrder: 'ascending',
  filteredTodos: []
};

const ToDoSlice = createSlice({  
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
    setImportanceFilter: (state, action) => {
      state.importanceFilter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setHoveredTodo: (state, action) => {
      state.sortOrder = action.payload;
    }
  },
})

export const selectFilteredTodos = (state) => {
  let filteredTodos = state.todos.todos;

  // Filter nach Wichtigkeit
  if (state.todos.importanceFilter > 0) {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.importance === state.todos.importanceFilter
    );
  }

  // Sortieren nach Dauer
  if (state.todos.sortOrder === 'ascending') {
    filteredTodos.sort((a, b) => a.duration - b.duration);
  } else if (state.todos.sortOrder === 'descending') {
    filteredTodos.sort((a, b) => b.duration - a.duration);
  }

  return filteredTodos;
};

export const { addTodo, setImportanceFilter, setSortOrder, setHoveredTodo} = ToDoSlice.actions
export default ToDoSlice.reducer
