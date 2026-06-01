// Review step — shows a summary of all fields, resets the form on submit.

function StepThree({ state, dispatch }) {
  const handleSubmit = e => {
    e.preventDefault();
    alert('Registered successfully!');
    dispatch({ type: 'reset' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Review</h3>
      <ul>
        <li>Name: {state.name}</li>
        <li>Email: {state.email}</li>
        <li>Username: {state.username}</li>
        <li>Password: {'•'.repeat(state.password.length)}</li>
      </ul>
      <button type="submit">Submit</button>
    </form>
  );
}

export default StepThree;
