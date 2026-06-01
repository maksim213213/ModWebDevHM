import { useReducer } from 'react';
import { formReducer, initialState } from './formReducer';
import ProgressBar from './components/ProgressBar';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';

export default function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div>
      <h1>Register</h1>
      <p>Step {state.step} of 3</p>
      <ProgressBar step={state.step} />

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
