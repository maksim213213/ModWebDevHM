# Practical Task: Redux Todo App

## Context

You are building a small **Todo** application using React and Redux Toolkit. The UI shell is already written — your job is to wire up the state management layer.

---

## Starter Code

Create a new Vite project and install dependencies:

```bash
npm create vite@latest redux-todo -- --template react
cd redux-todo
npm install @reduxjs/toolkit react-redux
```

Then replace the generated files with the shells below.

---

### `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// TODO (Part 3): import Provider and store, wrap <App /> with <Provider store={store}>

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

### `src/App.jsx`
```jsx
import AddTodoForm from './components/AddTodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'

// TODO (Bonus 2): dispatch loadTodos() here on mount with useEffect

export default function App() {
  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>
      <AddTodoForm />
      <FilterBar />
      <TodoList />
    </div>
  )
}
```

---

### `src/store.js`
```js
// TODO (Part 2): configure the store here with configureStore
// and register your todos reducer under the key 'todos'

export const store = {}
```

---

### `src/features/todos/todosSlice.js`
```js
// TODO (Part 1): implement the slice here
//
// State shape:
//   { items: [], filter: 'all' }
//
// Each todo: { id: number, text: string, completed: boolean }
//
// Reducers to implement:
//   addTodo(state, action)      — action.payload is the text string
//   toggleTodo(state, action)   — action.payload is the todo id
//   removeTodo(state, action)   — action.payload is the todo id
//   setFilter(state, action)    — action.payload is 'all' | 'active' | 'completed'
//
// Export action creators and the reducer as default.
```

---

### `src/components/AddTodoForm.jsx`
```jsx
import { useState } from 'react'

// TODO (Part 3): dispatch addTodo when the form is submitted

export default function AddTodoForm() {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    // TODO: dispatch addTodo(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        style={{ flex: 1, padding: '6px 8px' }}
      />
      <button type="submit">Add</button>
    </form>
  )
}
```

---

### `src/components/FilterBar.jsx`
```jsx
const FILTERS = ['all', 'active', 'completed']

// TODO (Part 3): read active filter from the store, dispatch setFilter on click

export default function FilterBar() {
  const activeFilter = 'all' // TODO: replace with useSelector

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => { /* TODO: dispatch setFilter(f) */ }}
          style={{ fontWeight: activeFilter === f ? 'bold' : 'normal' }}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
```

---

### `src/components/TodoList.jsx`
```jsx
// TODO (Part 3): read items and filter from the store,
// apply the filter, render the filtered list

export default function TodoList() {
  const todos = [] // TODO: replace with useSelector + filtering

  if (todos.length === 0) return <p style={{ color: '#999' }}>No todos here.</p>

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
        >
          {/* TODO: clicking the text toggles completion */}
          <span
            style={{
              flex: 1,
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : 'inherit',
            }}
          >
            {todo.text}
          </span>
          {/* TODO: clicking this button removes the todo */}
          <button>✕</button>
        </li>
      ))}
    </ul>
  )
}
```

---

### `src/api/todos.js` *(needed for Bonus 2)*
```js
export function fetchTodos() {
  return new Promise((resolve) =>
    setTimeout(() => resolve([
      { id: 1, text: 'Buy groceries', completed: false },
      { id: 2, text: 'Read about Redux', completed: true },
    ]), 800)
  )
}
```

---

## Your Task

### Part 1 — The Slice

Open `src/features/todos/todosSlice.js` and create a slice using `createSlice` with:

**State shape:**
```js
{
  items: [],      // array of todo objects
  filter: 'all'   // 'all' | 'active' | 'completed'
}
```

**Each todo object:**
```js
{ id: number, text: string, completed: boolean }
```

**Required reducers:**
- `addTodo(state, action)` — adds a new todo; `action.payload` is the text string
- `toggleTodo(state, action)` — toggles `completed` on the todo matching `action.payload` (the id)
- `removeTodo(state, action)` — removes the todo with the matching id
- `setFilter(state, action)` — sets `filter` to `action.payload`

Export the action creators and the reducer as default.

---

### Part 2 — The Store

Open `src/store.js` and configure the store using `configureStore`. Register your `todosSlice` reducer under the key `todos`.

---

### Part 3 — Connect to React

1. Wrap `<App />` with `<Provider store={store}>` in `main.jsx`
2. In `<TodoList />`: use `useSelector` to read and display todos. Apply the active filter — only show the todos that match it.
3. In `<AddTodoForm />`: use `useDispatch` to dispatch `addTodo` when the form is submitted
4. In `<FilterBar />`: dispatch `setFilter` when a filter button is clicked; highlight the active one
5. Wire up the toggle (click on text) and the ✕ remove button in each todo item

> At this point the app should be fully functional. Check it manually in the browser.

---

## Bonus Tasks

### Bonus 1 — Derived stats

Add a `<Stats />` component below `<FilterBar />` that shows:

```
3 items left · 2 completed
```

Compute these values with `useSelector` — **do not add extra fields to the state**. Derive the numbers from `items` on the fly.

---

### Bonus 2 — Async loading

The `src/api/todos.js` file above simulates fetching todos from a server with an 800 ms delay.

1. Add `status: 'idle'` and `error: null` fields to your slice's `initialState`
2. Create a `loadTodos` thunk using `createAsyncThunk` that calls `fetchTodos()`
3. Handle `pending`, `fulfilled`, and `rejected` in `extraReducers`
4. Dispatch `loadTodos()` from `<App />` on mount (`useEffect`)
5. Show `"Loading…"` while `status === 'loading'`

---

### Bonus 3 — Think about it (no code required)

Answer briefly in comments or a separate `ANSWERS.md`:

1. Why does `createSlice` let you write `state.items.push(...)` even though Redux requires immutability?
2. The `filter` value is client state. If the todo list were fetched from a real API, would you still store the fetched data in Redux — or somewhere else? Why?
3. What would break if two components each called `useSelector(state => state.todos.items)` and one of them also called `useSelector(state => state.todos.filter)`?  
   *(Hint: think about re-renders)*

---

## Acceptance Criteria

- [ ] Todos can be added, toggled, and removed
- [ ] Filter buttons work and the correct subset of todos is displayed
- [ ] Switching filters does not reset the todo list
- [ ] No direct state mutation outside of a `createSlice` reducer
- [ ] Store is configured with `configureStore`, not `createStore`

---

## Hints

- `Date.now()` is a fine way to generate unique ids for new todos
- `useSelector` re-runs after every dispatch — keep selectors simple
- If a component isn't re-rendering, check that `<Provider>` actually wraps it
- `.push()` inside a `createSlice` reducer is fine (Immer handles it). `.push()` on a value you got from `useSelector` is still wrong
