export class TodoItem {
  static ACTIVE = "active";
  static PRIORITY_NONE = 'NONE'
  static PRIORITY_FIRST = 'FIRST'
  static PRIORITY_SECOND = 'SECOND'
  static PRIORITY_FIRST_CLASSNAME = "primary";
  static PRIORITY_SECOND_CLASSNAME = "secondary";
  
  static COMPLETED = "completed";

  constructor({contents, isCompleted, _id, priority = TodoItem.PRIORITY_NONE}) {
    this.data = contents;
    this.isCompleted = isCompleted;
    this._id = _id;
    this.priority = priority;
  }
  toString() {
    return JSON.stringify(this);
  }
}
