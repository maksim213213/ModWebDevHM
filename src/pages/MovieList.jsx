import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWatched, removeMovie } from '../store/moviesSlice'

export default function MovieList() {
  const movies = useSelector((state) => state.movies)
  const dispatch = useDispatch()

  if (movies.length === 0) {
    return <p className="empty">No movies yet. Add one!</p>
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li key={movie.id} className="movie-list__item">
          <div className="movie-list__info">
            <Link to={`/movies/${movie.id}`} className="movie-list__title">
              {movie.title}
            </Link>
            <span className="movie-list__year">({movie.year})</span>
            <span className="movie-list__status">
              {movie.watched ? 'watched' : 'queued'}
            </span>
          </div>
          <div className="movie-list__actions">
            <button onClick={() => dispatch(toggleWatched(movie.id))}>
              Toggle watched
            </button>
            <button
              className="btn-danger"
              onClick={() => dispatch(removeMovie(movie.id))}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
