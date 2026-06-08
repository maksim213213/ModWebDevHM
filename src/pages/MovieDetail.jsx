import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWatched } from '../store/moviesSlice'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const movie = useSelector((state) =>
    state.movies.find((m) => m.id === Number(id)),
  )

  if (!movie) {
    return (
      <div className="detail">
        <p className="empty">Movie not found.</p>
        <Link to="/" className="back-btn">
          ← Back to all movies
        </Link>
      </div>
    )
  }

  return (
    <div className="detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>{movie.title}</h2>
      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Status:</strong>{' '}
        {movie.watched ? 'watched' : 'queued'}
      </p>
      <button onClick={() => dispatch(toggleWatched(movie.id))}>
        Toggle watched
      </button>
    </div>
  )
}
