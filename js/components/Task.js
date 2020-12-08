import { PRIORITY } from '../util/request.js';

const Task = class {
  constructor (id, contents, priority = 'NONE', isCompleted = false) {
    this._id = id;
    this.contents = contents;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }

  static get(id, contents){
    return new Task(id, contents);
  }

  static load(json){
    const task = new Task(json._id, json.contents, json.priority, json.isCompleted);
    return task;
  }

  toJSON(){
    return this.getInfo();
  }

  setContent(contents){
    this.contents = contents;
  }

  setPriority(value){
    this.priority = PRIORITY[value];
  }

  toggle(){
    this.isCompleted = !this.isCompleted;
  }

  getInfo(){
    return {_id : this._id, contents : this.contents, priority : this.priority, isCompleted : this.isCompleted};
  }

  getId(){
    return this._id;
  }
}
 export default Task;
