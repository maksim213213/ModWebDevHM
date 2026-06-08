import { createSlice } from '@reduxjs/toolkit'

const initialMovies = [
  { id: 1, title: 'Inception', year: 2010, watched: false },
  { id: 2, title: 'The Matrix', year: 1999, watched: true },
  { id: 3, title: 'Interstellar', year: 2014, watched: false },
  { id: 4, title: 'Blade Runner 2049', year: 2017, watched: false },
]

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMovies,
  reducers: {
    addMovie: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare({ title, year }) {
        return {
          payload: {
            id: Date.now(),
            title,
            year: Number(year),
            watched: false,
          },
        }
      },
    },
    toggleWatched(state, action) {
      const movie = state.find((m) => m.id === action.payload)
      if (movie) {
        movie.watched = !movie.watched
      }
    },
    removeMovie(state, action) {
      return state.filter((m) => m.id !== action.payload)
    },
  },
})

export const { addMovie, toggleWatched, removeMovie } = moviesSlice.actions
export default moviesSlice.reducer
