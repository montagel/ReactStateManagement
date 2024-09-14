import { atom } from 'jotai';

// Initialer Zustand
export const todosAtom = atom([]);
export const sortOrderAtom = atom('newest');
export const importanceFilterAtom = atom(0);
export const hoveredTodoAtom = atom(null);

// abgeleiteter Atom für die gefilterten und sortierten Todos
export const filteredAndSortedTodosAtom = atom((get) => {
    const todos = get(todosAtom);
    const importanceFilter = get(importanceFilterAtom);
    const sortOrder = get(sortOrderAtom);

    let filteredTodos = applyFilter(todos, importanceFilter);
    return applySort(filteredTodos, sortOrder);
});

// zum Hinzufügen eines neuen Todos
export const addTodoAtom = atom(
    null,
    (get, set, newTodo) => {
        const currentTodos = get(todosAtom);
        set(todosAtom, [...currentTodos, newTodo]);
        set(importanceFilterAtom, 0);
        set(sortOrderAtom, 'newest');
    }
);

// Hilfsfunktionen zum Filtern und Sortieren

const applyFilter = (todos, importanceFilter) => {
    if (importanceFilter === 0) {
        return todos; // Keine Filterung, wenn Filter auf 0 steht
    }
    return todos.filter(todo => Number(todo.importance) === importanceFilter);
};

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

