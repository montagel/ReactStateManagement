
import create from 'zustand';

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

// Zustand-Store 
const useTodoStore = create((set, get) => ({
  todos: [],
  filteredAndSortedTodos: [],
  sortOrder: 'newest',
  importanceFilter: 0,
  hoveredTodo: null,

  addTodo: (todo) => {
    const updatedTodos = [...get().todos, todo];
    const importanceFilter = 0;
    const sortOrder = 'newest';
    
    const filteredTodos = applyFilter(updatedTodos, importanceFilter);
    const sortedTodos = applySort(filteredTodos, sortOrder);
    
    set({
      todos: updatedTodos,
      filteredAndSortedTodos: sortedTodos,
      importanceFilter: importanceFilter,
      sortOrder: sortOrder
    });
  },

  setSortOrder: (sortOrder) => {
    const filteredTodos = applyFilter(get().todos, get().importanceFilter);
    const sortedTodos = applySort(filteredTodos, sortOrder);
    
    set({
      sortOrder: sortOrder,
      filteredAndSortedTodos: sortedTodos
    });
  },

  setImportanceFilter: (importanceFilter) => {
    const filteredTodos = applyFilter(get().todos, importanceFilter);
    const sortedTodos = applySort(filteredTodos, get().sortOrder);
    
    set({
      importanceFilter: importanceFilter,
      filteredAndSortedTodos: sortedTodos
    });
  },

  setHoveredTodo: (todo) => {
    set({
      hoveredTodo: todo
    });
  }
}));

export default useTodoStore;
