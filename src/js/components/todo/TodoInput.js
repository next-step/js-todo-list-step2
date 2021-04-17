export default class TodoInput {
  constructor({ todoData, onCreateItem }) {
    this.todoTitle = document.getElementById('new-todo-title');
    this.todoData = todoData;
    this.handleCreateItem = onCreateItem;

    this.init();
  }

  init() {
    this.todoTitle.onkeydown = (e) => {
      if (e.keyCode === 13) {
        const title = e.target.value.trim();

        if (title.length > 0) {
          this.handleCreateItem(title);
        }
        e.target.value = '';
      }
    };
  }
}
