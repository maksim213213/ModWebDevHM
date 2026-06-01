import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../features/todos/todosSlice'

const FILTERS = ['all', 'active', 'completed']

export default function FilterBar() {
  const activeFilter = useSelector((state) => state.todos.filter)
  const dispatch = useDispatch()

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => dispatch(setFilter(f))}
          style={{ fontWeight: activeFilter === f ? 'bold' : 'normal' }}
        >
          {f}
        </button>
      ))}
    </div>
  )
}
