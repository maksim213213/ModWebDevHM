import { useId, useRef, useImperativeHandle, forwardRef } from 'react';

// Merges the handout's two examples: FormField (useId) + FancyInput
// (forwardRef + useImperativeHandle). Exposes focus() and reset() to the parent.

const SmartInput = forwardRef(function SmartInput(
  { label, value, onChange, type = 'text', error },
  ref
) {
  const id = useId();
  const inputRef = useRef(); // internal — parent never touches this

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    reset: () => { inputRef.current.value = ''; },
  }));

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} style={{ color: 'red' }}>{error}</span>
      )}
    </div>
  );
});

export default SmartInput;
