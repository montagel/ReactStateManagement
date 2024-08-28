import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [], // alle To-Do-Elemente 
  hoveredTodo: null,    // Für das aktuell durch den User hervorgehobene To-Do-Element
};

const ToDoSlice = createSlice({  
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
    setHoveredTodo: (state, action) => {
      state.hoveredTodo = action.payload;
    }
  },
})


export const { addTodo, setHoveredTodo} = ToDoSlice.actions
export default ToDoSlice.reducer
