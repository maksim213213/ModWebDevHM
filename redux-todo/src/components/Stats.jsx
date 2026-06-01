import { useSelector } from 'react-redux'

// Bonus 1: derived stats — no extra state, computed from items on the fly
export default function Stats() {
  const items = useSelector((state) => state.todos.items)

  const completed = items.filter((t) => t.completed).length
  const left = items.length - completed

  return (
    <p style={{ color: '#666', marginBottom: 16 }}>
      {left} items left · {completed} completed
    </p>
  )
}
