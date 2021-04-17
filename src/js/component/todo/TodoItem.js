export class TodoItem {
  static ACTIVE = "active";
  static COMPLETED = "completed";

  constructor({contents, isCompleted, _id, priority}) {
    this.data = contents;
    this.isCompleted = isCompleted;
    this._id = _id;
    this.priority = priority;
  }
  toString() {
    return JSON.stringify(this);
  }
}
