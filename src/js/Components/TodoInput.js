const TodoInput = ({ onAdd }) => {
  const inputElement = document.querySelector('.new-todo');

  const addTodoItem = (e) => {
    if (e.key === 'Enter') {
      const todoTarget = e.target;
      const todoText = todoTarget.value.trim();
      if (todoText.length < 2) {
        return alert('2글자 이상이어야 합니다.');
      }

      onAdd(todoTarget.value);
      todoTarget.value = '';
    }
  };

  inputElement.addEventListener('keydown', addTodoItem);
};

export default TodoInput;
