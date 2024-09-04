import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TodoContextProvider } from './ContextToDo'
import { TodoDetailsContextProvider } from './ContextToDo';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoContextProvider>
    <TodoDetailsContextProvider>
      <App />
    </TodoDetailsContextProvider>
  </TodoContextProvider>
);

reportWebVitals(console.log);


