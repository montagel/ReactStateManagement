import React, { useEffect, useState } from 'react';
import './ToDoForm.css'

function ToDoForm({ addTodo, todos}) {
  const [input, setInput] = useState('');

  useEffect(() => { console.log("nnnn")}, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
        id: todos.length,
      text: input
    });

    setInput('');
  };

  return (
    <form className='todoForm' onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Neue Aufgabe"
        value={input}
        onChange={handleChange}
        name="text"
        className="todo-input"
      />
      <button className="todo-button">Hinzufügen</button>
    </form>
  );
}

export default ToDoForm;
