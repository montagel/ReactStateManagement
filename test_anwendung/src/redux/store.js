import { configureStore } from '@reduxjs/toolkit'
import ToDoSlice from './todo_slice'

export const store = configureStore({
  reducer: {
    todos: ToDoSlice,
  }
})
