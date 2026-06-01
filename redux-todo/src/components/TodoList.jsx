import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo, removeTodo } from '../features/todos/todosSlice'

export default function TodoList() {
  const items = useSelector((state) => state.todos.items)
  const filter = useSelector((state) => state.todos.filter)
  const status = useSelector((state) => state.todos.status)
  const dispatch = useDispatch()

  // Bonus 2: loading indicator
  if (status === 'loading') return <p style={{ color: '#999' }}>Loading…</p>

  // Derive the filtered list on the fly — never mutate the array from the store
  const todos = items.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  if (todos.length === 0) return <p style={{ color: '#999' }}>No todos here.</p>

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
        >
          <span
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              flex: 1,
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : 'inherit',
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => dispatch(removeTodo(todo.id))}>✕</button>
        </li>
      ))}
    </ul>
  )
}
