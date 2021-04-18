import TodoInput from "./todoInput.js";
import { TodoItem } from "./todoItem.js";
import TodoList from "./todoList.js";

export default function TodoApp() {
  const todoList = new TodoList(this);
  new TodoInput(this);
  const todoItems = [];
  let idGenerator = 0;

  this.render = () => {
    todoList.render(todoItems);
  }

  this.add = content => {
    const item = new TodoItem(idGenerator++, content);
    todoItems.push(item);
    this.render();
  }

  this.complete = id => {
    todoItems.find(item => item.matchId(id)).complete();
    this.render();
  }

  this.delete = id => {
    const index = todoItems.findIndex(item => item.matchId(id));
    todoItems.splice(index, 1);
    this.render();
  }

  this.deleteAll = () => {
    todoItems.splice(0, todoItems.length);
    this.render();
  }

  this.editing = id => {
    this.render();
    todoList.editing(id);
  }

  this.edit = (id, content) => {
    todoItems.find(item => item.matchId(id)).changeContent(content);
    this.render();
  }

  this.changePriority = (id, priority) => {
    todoItems.find(item => item.matchId(id)).changePriority(priority);
    this.render();
  }

  this.init = () => {
    this.render();
  }
}