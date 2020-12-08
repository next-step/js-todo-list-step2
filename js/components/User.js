import Task from './task.js';

const User = class extends Set{
  constructor (_id, name, filter = 'all') {
    super();
    this._id = _id;
    this.name = name;
    this.filter = filter;
  }

  static get(id, name){
    return new User(id, name);
  }

  static load(json){
    const user = new User(json._id, json.name);
    json.todoList.forEach(t=>{
      user.addTask(Task.load(t));
    });
    return user;
  }

  toJSON(){
    return this.getInfo();
  }

  setFilter(filter){
    this.filter = filter;
  }

  getFilter(){
    return this.filter;
  }

  addTask(task){
    if(!(task instanceof Task)) return console.log('invalid task');
    super.add(task);
  }

  removeTask(task){
    if(!(task instanceof Task)) return console.log('invalid task');
    super.delete(task);
  }

  clearTasks(){
    super.clear();
  }

  getTasks(){
    const tasks = [...super.values()];
    if(this.filter === 'active') return tasks.filter(todo => !todo.isCompleted);
    if(this.filter === 'completed') return tasks.filter(todo => todo.isCompleted);
    return tasks;
  }

  getInfo(){
    return {_id : this._id, name : this.name, todoList : this.getTasks()};
  }

  getId(){
    return this._id;
  }


  add(){};
  delete(){};
  clear(){};
  values(){};

}

export default User;
