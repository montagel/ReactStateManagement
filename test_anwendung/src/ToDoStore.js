import {create} from 'zustand'

// Zustand-Store 
const useTodoStore = create((set) => ({
  todos: [],
  filteredAndSortedTodos: [],
  sortOrder: 'newest',
  importanceFilter: 0,
  hoveredTodo: null,

  addTodo: (todo) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo];    
      return {
        todos: updatedTodos,
        filteredAndSortedTodos: applySort(applyFilter(updatedTodos, state.importanceFilter), state.sortOrder),
        importanceFilter: 0,
        sortOrder: 'newest'
      };
    });
  },

  setSortOrder: (sortOrder) => {
    set((state) => ({
      sortOrder: sortOrder,
      filteredAndSortedTodos: applySort(state.filteredAndSortedTodos, sortOrder)
    }));
  },

  setImportanceFilter: (importanceFilter) => {
    set((state) => ({
      importanceFilter: importanceFilter,
      filteredAndSortedTodos: applySort(applyFilter(state.todos, importanceFilter), state.sortOrder),
    }));
  },

  setHoveredTodo: (todo) => {
    set({
      hoveredTodo: todo
    });
  }
}));

export default useTodoStore;

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



