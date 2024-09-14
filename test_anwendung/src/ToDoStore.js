import {create} from 'zustand'

// Zustand-Store 
const useTodoStore = create((set, get) => ({
  todos: [],
  filteredAndSortedTodos: [],
  sortOrder: 'newest',
  importanceFilter: 0,
  hoveredTodo: null,

  addTodo: (todo) => {
    const updatedTodos = [...get().todos, todo];    
    set({
      todos: updatedTodos,
      filteredAndSortedTodos: applySort(applyFilter(updatedTodos, 0), 'newest'),
      importanceFilter: 0,
      sortOrder: 'newest'
    });
  },

  setSortOrder: (sortOrder) => {
    set({
      sortOrder: sortOrder,
      filteredAndSortedTodos: applySort(get().filteredAndSortedTodos, sortOrder)
    });
  },

  setImportanceFilter: (importanceFilter) => {
    set({
      importanceFilter: importanceFilter,
      filteredAndSortedTodos: applySort(applyFilter(get().todos, importanceFilter), get().sortOrder),
    });
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