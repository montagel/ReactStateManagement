import React from 'react';
import './ToDoForm.css';import { useSetAtom, useAtomValue } from 'jotai';
import { todosAtom, addTodo  } from './ToDoAtoms';

function ToDoForm() {
  // Lese den aktuellen Zustand der Todos
  const todos = useAtomValue(todosAtom);
  // Verwende die Action addTodo, um ein neues Todo hinzuzufügen
  const addNewTodo = useSetAtom(addTodo);

  // Lokale Variablen, um die Eingabewerte zu speichern
  let title = '';
  let description = '';
  let duration = '';
  let importance = 1;

  // Hinzufügen eines neuen To-Dos mit den aktuell eingegebenen Werten
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: todos.length,  // Länge der Todos für die ID
      title,
      description,
      duration,
      importance,
      createdAt: new Date().toISOString(),
    };

    // Verwende addNewTodo, um das neue Todo hinzuzufügen
    addNewTodo(newTodo);

    // Eingabefelder nach dem Hinzufügen des To-Dos zurücksetzen
    e.target.reset();
  };


  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div>
        <label>Titel</label>
        <input
          type="text"
          placeholder="Aufgabentitel"
          onChange={(e) => (title = e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <div>
        <label>Beschreibung</label>
        <textarea
          placeholder="Aufgabenbeschreibung"
          onChange={(e) => (description = e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <div>
        <label className="smallLabel">Dauer (in Stunden)</label>
        <input
          type="number"
          placeholder="Dauer"
          min="0"
          onChange={(e) => (duration = e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <div>
        <label className="smallLabel">Wichtigkeit (1-10)</label>
        <input
          type="number"
          min="1"
          max="10"
          onChange={(e) => (importance = e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <button className="todo-button">Hinzufügen</button>
    </form>
  );
}

export default ToDoForm;
