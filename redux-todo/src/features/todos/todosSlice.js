import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTodos } from '../../api/todos'

// Bonus 2: async thunk that loads todos from the (fake) API
export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
  const todos = await fetchTodos()
  return todos
})

const initialState = {
  items: [],
  filter: 'all', // 'all' | 'active' | 'completed'
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      // Immer lets us "mutate" here; action.payload is the text string
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      })
    },
    toggleTodo(state, action) {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    removeTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { addTodo, toggleTodo, removeTodo, setFilter } = todosSlice.actions
export default todosSlice.reducer
