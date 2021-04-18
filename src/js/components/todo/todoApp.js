import TodoInput from "./todoInput.js";
import { TodoItem } from "./todoItem.js";
import TodoList from "./todoList.js";

export default function TodoApp() {
  const todoList = new TodoList(this);
  new TodoInput(this);
  this.todoItems = [];
  this.idGenerator = 0;

  this.render = () => {
    todoList.render(this.todoItems);
  }

  this.add = content => {
    const item = new TodoItem(this.idGenerator++, content);
    this.todoItems.push(item);
    this.render();
  }

  this.complete = id => {
    this.todoItems.find(item => item.matchId(id)).complete();
    this.render();
  }

  this.delete = id => {
    const index = this.todoItems.findIndex(item => item.matchId(id));
    this.todoItems.splice(index, 1);
    this.render();
  }

  this.deleteAll = () => {
    this.todoItems.splice(0, this.todoItems.length);
    this.render();
  }

  this.editing = id => {
    this.render();
    todoList.editing(id);
  }

  this.edit = (id, content) => {
    this.todoItems.find(item => item.matchId(id)).changeContent(content);
    this.render();
  }

  this.changePriority = (id, priority) => {
    this.todoItems.find(item => item.matchId(id)).changePriority(priority);
    this.render();
  }

  this.init = todoItems => {
    this.todoItems = todoItems;
    this.idGenerator = todoItems.length === 0 ? 0 : todoItems[todoItems.length - 1].getId() + 1;
    this.render();
  }
}