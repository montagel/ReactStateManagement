import { configureStore } from '@reduxjs/toolkit'
import toDoSlice from './slices/toDoSlice'

export const store = configureStore({
  reducer: {
    todos: toDoSlice,
  }
})