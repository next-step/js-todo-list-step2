import { todoTemplate } from "@js/template";
import { getEl, pipe } from "@js/util";
import { getUsers } from "@lib/api";
import { FILTER_TYPE } from "@constants/constant";

import TodoUser from "./TodoUser";
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

  async init() {
    const { data } = await getUsers();
    const [user] = data;

    this.store.on(["user.name", "user.todoList", "filter"], this.updateViewPipe.bind(this));
    this.store.set({
      todoData: data,
      user: {
        id: user._id,
        name: user.name,
        todoList: user.todoList,
      },
      filter: FILTER_TYPE.ALL,
    });

    new TodoUser(this.store);
    new TodoInput(this.store);
    new TodoList(this.store);
    new TodoFilters(this.store);
  }

  _getTodoData() {
    const todoList = this.store.get().user.todoList;
    const filter = this.store.get().filter;

    let onFilteringTodoList = todoList;
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = todoList.filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = todoList.filter((item) => item.isCompleted);

    return { todoList, onFilteringTodoList };
  }

  _render({ todoList, onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map(({ contents, _id, isCompleted, isEditing }) => todoTemplate({ contents, _id, isCompleted, isEditing })).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;

    return todoList;
  }

  _saveTodoData(todoList) {
    saveData(todoList);
  }

  updateViewPipe() {
    pipe(this._getTodoData.bind(this), this._render.bind(this))();
  }
}

export default TodoApp;
