import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import AddMovie from './pages/AddMovie'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
