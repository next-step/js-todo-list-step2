import { todoTemplate } from "@js/template";
import { getEl, pipe } from "@js/util";
import { FILTER_TYPE } from "@js/constants/constant";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";

class TodoApp {
  constructor(store) {
    this.store = store;
    this.todoListEl = getEl("ul.todo-list");
    this.todoCountEl = getEl("span.todo-count strong");
    this.init();
  }

  init() {
    this.store.on(["todoList", "filter"], this.updateViewPipe.bind(this));
    this.store.set({
      todoList: loadData() ? loadData() : {},
      filter: FILTER_TYPE.ALL,
    });

    new TodoInput(this.store);
    new TodoList(this.store);
    new TodoFilters(this.store);
  }

  _getTodoData() {
    const todoList = this.store.get().todoList;
    const filter = this.store.get().filter;

    let onFilteringTodoList = Object.values(todoList);
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = Object.values(todoList).filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = Object.values(todoList).filter((item) => item.isCompleted);

    return { todoList, onFilteringTodoList };
  }

  _render({ todoList, onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map(({ title, id, isCompleted, isEditing }) => todoTemplate(title, id, isCompleted, isEditing)).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;

    return todoList;
  }

  _saveTodoData(todoList) {
    saveData(todoList);
  }

  updateViewPipe() {
    pipe(this._getTodoData.bind(this), this._render.bind(this), this._saveTodoData.bind(this))();
  }
}

export default TodoApp;
