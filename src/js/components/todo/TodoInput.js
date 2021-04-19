export default class TodoInput {
  constructor({ onCreateItem }) {
    this.todoTitle = document.getElementById('new-todo-title');
    this.handleCreateItem = onCreateItem;

    this.init();
  }

  init() {
    this.todoTitle.onkeydown = (e) => {
      if (e.keyCode === 13) {
        const title = e.target.value.trim();
        if (title.length < 2) {
          alert('TodoItem의 콘텐츠는 최소 2글자 이상이어야 합니다.');
          return;
        }
        this.handleCreateItem(title);
        e.target.value = '';
      }
    };
  }
}
