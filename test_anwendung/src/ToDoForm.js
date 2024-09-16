import React from 'react';
import './ToDoForm.css';
import { useContext } from 'react';
import { TodoContext } from './ContextToDo';

// Formular zum Erstellen eines To-Do-Elemnts
function ToDoForm() {

  const { todos, addTodo } = useContext(TodoContext);

  // Lokale Variablen, um die Eingabewerte zu speichern
  let title = '';
  let description = '';
  let duration = '';
  let importance = 1;

  // Hinzufügen eines neuen To-Dos mit den aktuell eingegebenen Werten
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: todos.length,
      title: title,
      description: description,
      duration: duration,
      importance: parseInt(importance, 10),
      createdAt: new Date().toISOString(),
    };

    addTodo(newTodo);

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
