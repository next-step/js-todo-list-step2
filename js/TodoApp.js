import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
import TodoCount from "./TodoCount.js";
import { filterMap } from "../utils/constants.js";
import TodoFilter from "./TodoFilter.js";
import { loadTodos, saveTodos } from "../utils/localStorage.js";
import api from "../utils/api.js";

export default function TodoApp(params) {
  const {
    $targetTodoList,
    $targetTodoInput,
    $targetTodoCount,
    $targetTodoFilter,
  } = params;
  this.data = params.data || loadTodos();
  this.filter = filterMap.ALL;
  this.nextId = this.data.length + 1;
  this.username = params.username;

  const onToggle = async (id) => {
    await api.toggleTodo(this.username, id);
    const nextData = await api.getTodos(this.username);
    this.setState(nextData, this.filter);
  };

  const onRemove = async (id) => {
    await api.removeTodo(this.username, id);
    const nextData = await api.getTodos(this.username);
    this.setState(nextData, this.filter);
  };

  const onModify = async (id, nextContent) => {
    await api.modifyTodo(this.username, id, nextContent);
    const nextData = await api.getTodos(this.username);
    this.setState(nextData, this.filter);
  };

  const onKeyEnter = async (content) => {
    await api.postTodo(this.username, content);
    const nextData = await api.getTodos(this.username);
    this.setState(nextData, this.filter);
  };

  const onChangeFilter = (nextFilter) => {
    this.setState(this.data, nextFilter);
  };

  const filterTodos = (todos, filter) => {
    switch (filter) {
      case filterMap.ACTIVE:
        return todos.filter((todo) => !todo.isCompleted);
      case filterMap.COMPLETED:
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  };

  this.todoInput = new TodoInput({
    $target: $targetTodoInput,
    onKeyEnter,
  });

  this.todoList = new TodoList({
    $target: $targetTodoList,
    data: this.data,
    onToggle,
    onRemove,
    onModify,
  });

  this.todoCount = new TodoCount({
    $target: $targetTodoCount,
    count: this.data.length,
  });

  this.todoFilter = new TodoFilter({
    $target: $targetTodoFilter,
    filter: this.filter,
    onChangeFilter,
  });

  this.setState = (nextData, nextFilter) => {
    this.data = nextData;
    this.filter = nextFilter;
    const filteredTodos = filterTodos(this.data, this.filter);

    this.todoList.setState(filteredTodos);
    this.todoCount.setState(filteredTodos.length);
    this.todoFilter.setState(this.filter);
    saveTodos(this.data);
    this.render();
  };

  this.render = () => {
    this.todoList.render();
    this.todoCount.render();
    this.todoFilter.render();
  };
}
