import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AddTodoForm from './components/AddTodoForm'
import FilterBar from './components/FilterBar'
import Stats from './components/Stats'
import TodoList from './components/TodoList'
import { loadTodos } from './features/todos/todosSlice'

export default function App() {
  const dispatch = useDispatch()

  // Bonus 2: load todos from the API once on mount
  useEffect(() => {
    dispatch(loadTodos())
  }, [dispatch])

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Todo App</h1>
      <AddTodoForm />
      <FilterBar />
      <Stats />
      <TodoList />
    </div>
  )
}
