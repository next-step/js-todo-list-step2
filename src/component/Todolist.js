class Todolist {
  constructor() {
    this.$target = document.createElement('ul');
    this.$target.id = 'todo-list';
    this.$target.className = 'todo-list';
  }
}

export default Todolist;
