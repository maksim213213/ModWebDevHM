import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addMovie } from '../store/moviesSlice'

export default function AddMovie() {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    dispatch(addMovie({ title: title.trim(), year }))
    navigate('/')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add a movie</h2>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie title"
        />
      </label>
      <label>
        Year
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="2024"
        />
      </label>
      <button type="submit">Add movie</button>
    </form>
  )
}
