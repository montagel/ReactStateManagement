import React, { useState } from 'react';
import './ToDoForm.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from './redux/todo_slice';


// Formular zum Erstellen eines To-Do-Elemnts
function ToDoForm() {
  
  const todos= useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()

  // Eigenschaften eines To-Do-Elements
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [importance, setImportance] = useState(1);

  // Hinzufügen eines neuen To-Do mit den aktuell eingegebenen Werten
  const handleSubmit = (e) => {
    // Verhindert, dass die Seite beim Abschicken des Formulars neu geladen wird
    e.preventDefault();

   dispatch(addTodo({
      id: todos.length,
      title: title,
      description: description,
      duration: duration,
      importance: importance,
      createdAt: new Date().toISOString()
    }));

    // Eingabefelder im Formular werden nach dem Hinzufügen des To-Dos zurückgesetzt
    setTitle('');
    setDescription('');
    setDuration('');
    setImportance(1);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div>
        <label>Titel</label>
        <input
          type="text"
          placeholder="Aufgabentitel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <div>
        <label>Beschreibung</label>
        <textarea
          placeholder="Aufgabenbeschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <div>
        <label className='smallLabel'>Dauer (in Stunden)</label>
        <input
          type="number"
          placeholder="Dauer"
          min="0"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <div>
        <label className='smallLabel'>Wichtigkeit (1-10)</label>
        <input
          type="number"
          min="1"
          max="10"
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          required
          className="todo-input"
        />
      </div>
      <button className="todo-button">Hinzufügen</button>
    </form>
  );
}

export default ToDoForm;
