import React, { useState } from 'react';
import './ToDoForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './redux/todo_slice';


// Formular zum Erstellen eines To-Do-Elemnts
function ToDoForm() {

  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()
  // Lokale Variablen, um die Eingabewerte zu speichern
  let title = '';
  let description = '';
  let duration = '';
  let importance = 1;

  // Hinzufügen eines neuen To-Dos mit den aktuell eingegebenen Werten
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo({
      id: todos.length,
      title: title,
      description: description,
      duration: duration,
      importance: importance,
      createdAt: new Date().toISOString(),
    }));

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
