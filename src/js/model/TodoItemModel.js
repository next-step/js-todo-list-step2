class TodoItemModel {
  constructor({ contents, id, isCompleted, priority }) {
    this.contents = contents;
    this.id = id;
    this.isCompleted = isCompleted;
    this.editing = false;
    this.priority = priority;
  }
}

export default TodoItemModel;
