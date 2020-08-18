export default class TodoInput {
  constructor(addTodo) {
    this.todoInputElement = document.querySelector('.input-container');
    this.addTodo = addTodo;

    this.render();
    this.addEvent();
  }

  addEvent() {
    this.todoInputElement.addEventListener('keypress', ($event) => {
      if ($event.key !== 'Enter') {
        return;
      }

      const inputValue = $event.target.value;
      const trimedValue = inputValue.trim();
      if (trimedValue) {
        this.addTodo(trimedValue);
        $event.target.value = '';
      } else {
        alert('할일을 입력해주세요.');
      }
    });
  }

  render() {
    this.todoInputElement.innerHTML = `
      <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus
      />
    `;
  }
}
