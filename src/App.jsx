import { useState, useEffect } from 'react';

function useGitHubUser(username) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status === 404 ? 'User not found' : 'API error'))
      .then(data => { setUser(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [username]);

  return { user};
}

function useSearchHistory() {
  const [history, setHistory] = useState([]);

  const addSearch = (name) =>
    setHistory(prev => [name, ...prev.filter(h => h !== name)].slice(0, 5));

  return { history, addSearch };
}

function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar_url} alt={user.login} />
      <div>
        <h2>{user.name || user.login}</h2>
        <p className="muted">@{user.login}</p>
        {user.bio && <p>{user.bio}</p>}
        <p className="muted">{user.public_repos} repos · {user.followers} followers · {user.following} following</p>
      </div>
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');
  const { user, loading, error } = useGitHubUser(username);
  const { history, addSearch } = useSearchHistory();

  const search = (name) => {
    if (!name.trim()) return;
    setQuery(name);
    setUsername(name);
    addSearch(name);
  };

  return (
    <div>
      <h1>GitHub User Search</h1>

      <form onSubmit={e => { e.preventDefault(); search(query); }}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="GitHub username" />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {user && <UserCard user={user} />}

      {history.length > 0 && (
        <div className="history">
          <p className="muted">Recent:</p>
          {history.map(name => (
            <button key={name} className="tag" onClick={() => search(name)}>{name}</button>
          ))}
        </div>
      )}
    </div>
  );
}
