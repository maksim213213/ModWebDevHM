import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__brand">Movie Watchlist</h1>
      <nav className="header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link--active' : 'nav-link'
          }
        >
          All Movies
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? 'nav-link nav-link--active' : 'nav-link'
          }
        >
          + Add Movie
        </NavLink>
      </nav>
    </header>
  )
}
