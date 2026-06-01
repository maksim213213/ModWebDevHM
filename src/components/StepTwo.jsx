import { useLayoutEffect, useRef } from 'react';
import SmartInput from './SmartInput';

// Account step — auto-focuses the first input on mount.

function StepTwo({ state, dispatch }) {
  const firstRef = useRef();
  useLayoutEffect(() => { firstRef.current?.focus(); }, []);

  return (
    <div>
      <SmartInput ref={firstRef} label="Username"
        value={state.username}
        onChange={e => dispatch({ type: 'setField', payload: { field: 'username', value: e.target.value } })}
        error={state.errors.username}
      />
      <SmartInput label="Password" type="password"
        value={state.password}
        onChange={e => dispatch({ type: 'setField', payload: { field: 'password', value: e.target.value } })}
        error={state.errors.password}
      />
    </div>
  );
}

export default StepTwo;
