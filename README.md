# React: Functional Components, Hooks & Custom Hooks
### Student Handout

---


## Core Concepts Cheatsheet

### Functional Component

A component is a function that takes props and returns JSX.

```jsx
function Greeting({ name, count }) {
  return <p>Hello, {name}! You have {count} messages.</p>;
}
```

---

### useState

Stores local state. Returns `[value, setter]`. Calling the setter triggers a re-render.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Updater function form — safer when new state depends on old state */}
      <button onClick={() => setCount(c => c - 1)}>−</button>
    </div>
  );
}
```

**Rules:**
- Never mutate state directly (`state.value = x` won't work)
- Use the updater function form `setCount(c => c + 1)` when new state depends on previous state

---

### useEffect

Runs side effects after render. The dependency array controls when it re-runs.

```jsx
useEffect(() => {
  // runs after every render
});

useEffect(() => {
  // runs once (on mount)
}, []);

useEffect(() => {
  // runs when `username` changes
  fetchUser(username);
}, [username]);

useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id); // cleanup on unmount
}, []);
```

**Dependency array rules:**
- Omitted → runs after every render
- `[]` → runs once after mount
- `[a, b]` → runs when `a` or `b` changes

**Always clean up** timers, subscriptions, and event listeners.

---

### Custom Hooks

A custom hook is a function whose name starts with `use` and can call other hooks. It lets you **share stateful logic** (not state itself) between components.

```jsx
function useTimer(autoStart = true) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(autoStart);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const reset = () => { setSeconds(0); setRunning(false); };
  return { seconds, running, setRunning, reset };
}

// Usage — logic is encapsulated, component stays clean
function Timer() {
  const { seconds, running, setRunning, reset } = useTimer();
  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={() => setRunning(r => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**Rules of Hooks (never break these):**
1. Only call hooks at the **top level** — not inside `if`, loops, or nested functions
2. Only call hooks from **React functions** or other custom hooks

---

## Coding Task — GitHub User Search App

**Time: 50 minutes**

Build a React app that searches the GitHub API, displays a user profile, and tracks recent searches.

### API

```
GET https://api.github.com/users/{username}

Returns: login, name, avatar_url, bio, public_repos, followers, following
```

No API key needed. Works directly from the browser.

---

### Starter File — `App.jsx`

```jsx
import { useState, useEffect } from 'react';

// TODO 1: Create useGitHubUser(username) custom hook
//   - fetch the GitHub API when username changes
//   - return { user, loading, error }
//   - don't fetch if username is empty

// TODO 2: Create useSearchHistory() custom hook
//   - keeps an array of the last 5 unique searches
//   - exposes addSearch(username) and history[]

function UserCard({ user }) {
  // TODO 3: Render avatar_url, name, bio, public_repos, followers
  return <div>UserCard placeholder</div>;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');

  // TODO 4: Use both hooks here

  const handleSearch = (e) => {
    e.preventDefault();
    // set username, add to history
  };

  return (
    <div>
      <h1>GitHub User Search</h1>

      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {/* TODO: loading state, error state, UserCard, history list */}
    </div>
  );
}
```

---

### Requirements

**Must-haves (required):**
- `useGitHubUser` custom hook that fetches user data
- Loading and error states shown in the UI
- `useSearchHistory` hook that tracks the last 5 unique searches
- Clicking a history item re-runs the search
- No fetch triggered if username is empty

**Bonus challenges (optional):**
- Debounce: create a `useDebounce(value, delay)` hook and search automatically as you type
- Persist history to `localStorage` via a custom hook
- Cancel in-flight requests with `AbortController`

---

### Hints

**Hint 1 — structure of `useGitHubUser`:**
The hook takes a `username` string. Use three state variables: `user`, `loading`, `error`. Put the fetch inside `useEffect` with `[username]` as the dependency array. Guard with `if (!username) return;` at the top of the effect.

**Hint 2 — keeping history unique:**
In `addSearch`, filter out the incoming value first, then prepend it, then slice to 5:
```js
setHistory(prev =>
  [username, ...prev.filter(h => h !== username)].slice(0, 5)
);
```

**Hint 3 — `useDebounce` structure:**
The hook stores a `debouncedValue` in state. In a `useEffect([value, delay])`, set a timeout that updates it, and clear it on cleanup. Return `debouncedValue`.

---

## Further Reading

- **react.dev/learn** — official docs with interactive examples for all hooks
- **usehooks.com** — well-tested custom hook patterns
- **"You Might Not Need an Effect"** — official guide on avoiding over-use of useEffect
