import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filteredAndSortedTodos: [],
  sortOrder: 'newest',
  importanceFilter: 0,
  hoveredTodo: null,    // Für das aktuell durch den User hervorgehobene To-Do-Element

};

const ToDoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      state.filteredAndSortedTodos = state.todos;
      // Setze den Filter auf alle (0) und sortiere nach neuesten
      state.importanceFilter = 0;
      state.sortOrder = 'newest';
      state.filteredAndSortedTodos = sortAndFilterTodos(state.todos, state.sortOrder, state.importanceFilter);
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredAndSortedTodos = sortAndFilterTodos(state.todos, state.sortOrder, state.importanceFilter);
    },
    setImportanceFilter: (state, action) => {
      state.importanceFilter = action.payload;
      state.filteredAndSortedTodos = sortAndFilterTodos(state.todos, state.sortOrder, state.importanceFilter);
    },
    setHoveredTodo: (state, action) => {
      state.hoveredTodo = action.payload;
    }
  },
});

const sortAndFilterTodos = (todos, sortOrder, importanceFilter) => {
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
};

export const { addTodo, setSortOrder, setImportanceFilter, setHoveredTodo} = ToDoSlice.actions;
export default ToDoSlice.reducer;

