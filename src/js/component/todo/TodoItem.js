export class TodoItem {
  static ACTIVE = "active";
  static COMPLETED = "completed";

  constructor(data, isCompleted, id, priority) {
    this.data = data;
    this.isCompleted = isCompleted;
    this.id = id;
    this.priority = priority;
  }
  toString() {
    return JSON.stringify(this);
  }
}
