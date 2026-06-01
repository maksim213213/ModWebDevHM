# React Hooks — Lesson 2
### Student Handout

---

## What we're building on

You read Dan Abramov's *A Complete Guide to useEffect*. The key mental model:

> **Each render has its own props, state, and effects.** A function inside a render closes over the values from *that* render — not the latest ones.

This is why effects can see stale state. Today's hooks either sidestep that problem entirely (`useReducer`) or operate outside the render cycle deliberately (`useLayoutEffect`, `useImperativeHandle`).

---

## Hook reference

### useReducer

Alternative to `useState` when:
- State has multiple related fields that update together
- Transitions have clear names (good for readability and testing)
- You need the "current full state" to compute the next state

```jsx
import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step };
    case 'decrement': return { ...state, count: state.count - state.step };
    case 'setStep':   return { ...state, step: action.payload };
    case 'reset':     return initialState;
    default:          return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>Count: {state.count} (step: {state.step})</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>−</button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'setStep', payload: +e.target.value })}
      />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

**Key point:** `dispatch` has a stable identity across renders — safe in `useEffect` dependency arrays. The reducer is a pure function and easy to unit test.

---

### useLayoutEffect

Same signature as `useEffect`. Different timing:

| | `useEffect` | `useLayoutEffect` |
|---|---|---|
| Fires | After paint | After DOM update, before paint |
| Blocks paint? | No | Yes |
| Use for | Data fetching, subscriptions | DOM measurement, preventing flicker |

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function MeasuredBox() {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    // Safe to read layout here — browser hasn't painted yet
    setWidth(ref.current.getBoundingClientRect().width);
  }, []);

  return (
    <div ref={ref} style={{ background: '#eee', padding: 20 }}>
      I am {Math.round(width)}px wide
    </div>
  );
}
```

**Rule of thumb:** Default to `useEffect`. Reach for `useLayoutEffect` only when you see a visible flicker or need to measure the DOM before the user sees the result.

---

### useId

Generates a stable, unique ID per component instance. Solves the accessibility problem of linking `<label>` to `<input>` when a component is rendered multiple times.

```jsx
import { useId } from 'react';

function FormField({ label }) {
  const id = useId(); // e.g. ":r0:", ":r1:" — unique per instance

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}

// Two instances — two different IDs, no collision
function App() {
  return (
    <>
      <FormField label="First name" />
      <FormField label="Last name" />
    </>
  );
}
```

**Don't use `useId` as a list key** — it's not related to data identity. Use it only for accessibility attributes (`htmlFor`, `aria-describedby`, `aria-labelledby`).

---

### useImperativeHandle (revisited)

Lets a component expose a controlled public API to its parent via a ref. Requires `forwardRef`.

```jsx
import { useImperativeHandle, forwardRef, useRef } from 'react';

const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(); // internal — parent never touches this

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }));

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const ref = useRef();
  return (
    <div>
      <FancyInput ref={ref} placeholder="type here" />
      <button onClick={() => ref.current.focus()}>Focus</button>
      <button onClick={() => ref.current.clear()}>Clear</button>
    </div>
  );
}
```

**The parent sees only `{ focus, clear }`** — it cannot reach the raw `<input>` DOM node.

---

## Coding Task — Multi-step registration form

**Time: 55 minutes**

Build a 3-step registration form that uses all four hooks covered today.

### Steps

| Step | Fields |
|------|--------|
| 1 — Personal | Name, email |
| 2 — Account | Username, password |
| 3 — Review | Summary of all fields + submit |

### Requirements

**Must-haves:**
- `formReducer` handles all field updates, step navigation, and reset
- `SmartInput` component uses `useId` to properly link `<label>` and `<input>` (+ `aria-describedby` for errors)
- First input on each step is auto-focused using `useLayoutEffect` on mount
- Step 3 shows a readable summary of everything entered
- Submit dispatches `reset` and returns to step 1

**Bonus:**
- Expose `reset()` from `SmartInput` via `useImperativeHandle`; call it from App on full reset
- Add validation in the reducer — block `nextStep` if required fields are empty
- Animate a step-progress bar using `useLayoutEffect` to measure the container width

---

### Starter file — `App.jsx`

```jsx
import { useReducer, useLayoutEffect, useId, useRef,
         useImperativeHandle, forwardRef } from 'react';

// ─── TODO 1 ───────────────────────────────────────────────────────────────────
// Define the reducer.
// initialState: { step: 1, name: '', email: '', username: '', password: '', errors: {} }
// Actions: 'setField' (payload: { field, value }), 'nextStep', 'prevStep', 'reset'

const initialState = { /* ... */ };
function formReducer(state, action) { /* ... */ }


// ─── TODO 2 ───────────────────────────────────────────────────────────────────
// Build SmartInput using forwardRef + useImperativeHandle.
// Props: label, value, onChange, type="text", error
// Use useId to link label and input.
// Expose focus() and reset() via the ref.

const SmartInput = forwardRef(function SmartInput(props, ref) {
  // ...
});


// ─── TODO 3 ───────────────────────────────────────────────────────────────────
// In each step component, focus the first input on mount using useLayoutEffect.

function StepOne({ state, dispatch }) {
  const firstRef = useRef();
  // useLayoutEffect: focus firstRef on mount

  return (
    <div>
      <SmartInput ref={firstRef} label="Name"
        value={state.name}
        onChange={e => dispatch({ type: 'setField', payload: { field: 'name', value: e.target.value } })}
        error={state.errors.name}
      />
      <SmartInput label="Email" type="email"
        value={state.email}
        onChange={e => dispatch({ type: 'setField', payload: { field: 'email', value: e.target.value } })}
        error={state.errors.email}
      />
    </div>
  );
}

function StepTwo({ state, dispatch }) { /* username, password — same pattern */ }

function StepThree({ state, dispatch }) { /* review all fields, dispatch reset on submit */ }


export default function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div>
      <h1>Register</h1>
      <p>Step {state.step} of 3</p>

      {state.step === 1 && <StepOne state={state} dispatch={dispatch} />}
      {state.step === 2 && <StepTwo state={state} dispatch={dispatch} />}
      {state.step === 3 && <StepThree state={state} dispatch={dispatch} />}

      <div>
        {state.step > 1 && <button onClick={() => dispatch({ type: 'prevStep' })}>Back</button>}
        {state.step < 3 && <button onClick={() => dispatch({ type: 'nextStep' })}>Next</button>}
      </div>
    </div>
  );
}
```

---

### Hints

**Hint 1 — `setField` pattern:**
```js
case 'setField':
  return { ...state, [action.payload.field]: action.payload.value };
```
The computed property key `[action.payload.field]` lets one action update any field.

**Hint 2 — two refs in SmartInput:**
The `ref` from `forwardRef` is the *outer* ref the parent holds. Create a separate `inputRef = useRef()` internally and attach it to `<input ref={inputRef}>`. Then expose methods via `useImperativeHandle(ref, () => ({ ... }))`.

**Hint 3 — focus without flicker:**
```js
useLayoutEffect(() => { firstRef.current?.focus(); }, []);
```
Empty dep array = fires once on mount. `useLayoutEffect` ensures the focus happens before the browser paints.

**Hint 4 — validation in reducer:**
In the `'nextStep'` case, build an `errors` object first. If it has keys, return `{ ...state, errors }` without incrementing `step`. Only advance if there are no errors.

