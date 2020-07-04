function TodoItem(contents) {
  this.id = Date.now();
  this.contents = contents;
  this.completed = false;
  this.editing = false;
  this.chipSelected = false;
  this.priority = 0;

  this.toggleCompleted = () => (this.completed = !this.completed);

  this.toggleEditing = () => (this.editing = !this.editing);
}

export default TodoItem;
