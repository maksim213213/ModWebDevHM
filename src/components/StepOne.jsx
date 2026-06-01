import { useLayoutEffect, useRef } from 'react';
import SmartInput from './SmartInput';

// Personal step — auto-focuses the first input on mount.

function StepOne({ state, dispatch }) {
  const firstRef = useRef();
  useLayoutEffect(() => { firstRef.current?.focus(); }, []);

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

export default StepOne;
