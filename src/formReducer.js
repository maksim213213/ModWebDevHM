// Reducer: handles every field update, step navigation, validation and reset.

export const initialState = {
  step: 1,
  name: '',
  email: '',
  username: '',
  password: '',
  errors: {},
};

// Required fields per step — used to validate before advancing.
const requiredByStep = {
  1: ['name', 'email'],
  2: ['username', 'password'],
};

function validateStep(state) {
  const errors = {};
  for (const field of requiredByStep[state.step] ?? []) {
    if (!state[field].trim()) {
      errors[field] = 'This field is required';
    }
  }
  if (state.step === 1 && state.email.trim() && !state.email.includes('@')) {
    errors.email = 'Enter a valid email';
  }
  return errors;
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'setField':
      // Hint 1 — computed key lets one action update any field.
      return { ...state, [action.payload.field]: action.payload.value };
    case 'nextStep': {
      const errors = validateStep(state);
      if (Object.keys(errors).length > 0) {
        return { ...state, errors }; // block advance, surface errors
      }
      return { ...state, step: Math.min(state.step + 1, 3), errors: {} };
    }
    case 'prevStep':
      return { ...state, step: Math.max(state.step - 1, 1), errors: {} };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}
