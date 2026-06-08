# Practice Task: Movie Watchlist
 
**Stack:** React + React Router v6 + Redux Toolkit

---

## Goal

Build a small SPA — a personal movie watchlist. The task combines **React Router** (multiple routes, URL parameters, navigation) and **Redux** (global state, actions).

---

## Project setup

```bash
npm create vite@latest movie-watchlist -- --template react
cd movie-watchlist
npm install react-router-dom @reduxjs/toolkit react-redux
npm run dev
```

---

## Data (use as Redux initial state)

```js
const initialMovies = [
  { id: 1, title: 'Inception',         year: 2010, watched: false },
  { id: 2, title: 'The Matrix',        year: 1999, watched: true  },
  { id: 3, title: 'Interstellar',      year: 2014, watched: false },
  { id: 4, title: 'Blade Runner 2049', year: 2017, watched: false },
]
```

---

## Route structure

| URL | What to render |
|-----|----------------|
| `/` | List of all movies |
| `/movies/:id` | Single movie detail page |
| `/add` | Add new movie form |
| `*` | 404 — page not found |

---

## What to implement

### 1. Redux slice (`moviesSlice`)

Create a slice with three actions:

- **`addMovie(movie)`** — add a movie to the list
- **`toggleWatched(id)`** — flip the `watched` boolean for a movie
- **`removeMovie(id)`** — remove a movie from the list

### 2. Movie list page (`/`)

- Display all movies: title, year, status (✅ watched / ⏳ queued)
- Clicking the title navigates to `/movies/:id`
- "Toggle watched" button next to each movie
- "Delete" button that removes the movie from the list

### 3. Movie detail page (`/movies/:id`)

- Read `:id` from the URL using `useParams`
- Show movie details (title, year, status)
- "← Back" button that goes back using `useNavigate(-1)`
- "Toggle watched" button

### 4. Add movie form (`/add`)

- Two inputs: "Title" and "Year"
- On submit: dispatch `addMovie`, then navigate to `/` using `useNavigate`

### 5. Navigation

- Persistent header with links: "All Movies" and "+ Add Movie"
- Use `NavLink` to highlight the active link

---

## Hints

```js
// Get a movie by id from the store
const { id } = useParams()
const movie = useSelector(state =>
  state.movies.find(m => m.id === Number(id))
)

// Dispatch an action
const dispatch = useDispatch()
dispatch(toggleWatched(movie.id))

// Navigate after form submit
const navigate = useNavigate()
navigate('/')
```

---

## Bonus

- Add a `/watched` route — show only watched movies
- Use `useSearchParams` for filtering: `/movies?filter=watched`

---

## Done when

- [ ] URL changes on navigation
- [ ] Browser back button works correctly
- [ ] Navigating directly to `/movies/2` opens the right movie
- [ ] Redux state updates correctly (toggle, add, delete)
- [ ] After adding a movie, the app redirects to `/`
