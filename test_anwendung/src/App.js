import './App.css';
import React, { useState } from 'react';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import TodoDetails from './ToDoDetails';
import { store } from './redux/store';
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
    <div>
      <h1>Meine To-Do Liste</h1>
      <div className="todoApp">
        <div className="todo-container">
        <h3>neue Aufgabe</h3>
          <ToDoForm/>
          <h3>Detailinformationen</h3>
          <TodoDetails></TodoDetails>
        </div>
        <ToDoList/>
      </div>
    </div>
    </Provider>
  );
}

export default App;
