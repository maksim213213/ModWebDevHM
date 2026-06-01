export function fetchTodos() {
  return new Promise((resolve) =>
    setTimeout(() => resolve([
      { id: 1, text: 'Buy groceries', completed: false },
      { id: 2, text: 'Read about Redux', completed: true },
    ]), 800)
  )
}
