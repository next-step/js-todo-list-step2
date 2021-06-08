export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector('.new-todo');

  const addTodoItem = (event) => {
    if (event.target !== $todoInput) return;
    if (event.key === 'Enter') {
      console.log($todoInput.value.trim());
      onAdd($todoInput.value.trim());
      $todoInput.value = '';
    }
  };

  $todoInput.addEventListener("keyup", addTodoItem);
} 