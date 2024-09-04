import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filteredAndSortedTodos: [],
  sortOrder: 'newest',
  importanceFilter: 0,
  hoveredTodo: null,    
};

const ToDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      state.importanceFilter = 0;
      state.sortOrder = 'newest';
      state.filteredAndSortedTodos = applyFilter(state.todos, state.importanceFilter);
      state.filteredAndSortedTodos = applySort(state.filteredAndSortedTodos, state.sortOrder);
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredAndSortedTodos = applySort(state.filteredAndSortedTodos, state.sortOrder);
    },
    setImportanceFilter: (state, action) => {
      state.importanceFilter = action.payload;
      state.filteredAndSortedTodos = applyFilter(state.todos, state.importanceFilter);
      state.filteredAndSortedTodos = applySort(state.filteredAndSortedTodos, state.sortOrder); 
    },
    setHoveredTodo: (state, action) => {
      state.hoveredTodo = action.payload;
    }
  },
});

// Funktion zum Filtern nach Wichtigkeit
const applyFilter = (todos, importanceFilter) => {
  if (importanceFilter === 0) {
    return todos; // Keine Filterung, wenn Filter auf 0 steht
  }
  return todos.filter(todo => Number(todo.importance) === importanceFilter);
};

// Funktion zum Sortieren
const applySort = (todos, sortOrder) => {
  if (sortOrder === 'DurationAscending') {
    return [...todos].sort((a, b) => a.duration - b.duration);
  } else if (sortOrder === 'DurationDescending') {
    return [...todos].sort((a, b) => b.duration - a.duration);
  } else if (sortOrder === 'newest') {
    return [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === 'oldest') {
    return [...todos].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  return todos;
};

export const { addTodo, setSortOrder, setImportanceFilter, setHoveredTodo } = ToDoSlice.actions;
export default ToDoSlice.reducer;
