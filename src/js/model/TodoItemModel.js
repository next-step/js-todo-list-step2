class TodoItemModel {
  constructor({ contents, id, isCompleted }) {
    this.contents = contents;
    this.id = id;
    this.isCompleted = isCompleted;
    this.editing = false;
  }
}

export default TodoItemModel;
