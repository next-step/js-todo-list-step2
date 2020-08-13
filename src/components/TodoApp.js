import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoInput from "./TodoInput.js";
import { SELECTOR, FILTER } from "../utils/constants.js";
import { getTodoByUsername } from "../apis/todo.js";

export default function TodoApp($todoApp) {
  this.state = {
    todos: [],
    filter: location.hash.replace("#/", ""),
    loading: true,
  };

  this.setState = ({ todos, filter, loading }) => {
    if (todos) {
      this.state.todos = todos;
    }

    if (filter) {
      this.state.filter = filter;
    }

    if (typeof loading === "boolean") {
      this.state.loading = loading;
    }

    this.render();
  };

  this.getFilteredTodos = (filter) => {
    switch (filter) {
      case FILTER.ACTIVE:
        return this.state.todos.filter((todo) => !todo.isCompleted);
      case FILTER.COMPLETED:
        return this.state.todos.filter((todo) => todo.isCompleted);
      default:
        return this.state.todos;
    }
  };

  this.loadTodosByUsername = async (username) => {
    this.setState({ loading: true });
    const todos = await getTodoByUsername(username);
    this.setState({ todos: todos || [], loading: false });
    todoCount.changeSelected(this.state.filter);
    console.log(todos || []);
  };

  const todoInput = new TodoInput(
    $todoApp.querySelector(`.${SELECTOR.NEW_TODO}`),
    {
      onAdd: (todo) => {
        this.setState([...this.todos, todo]);
      },
    }
  );

  const todoList = new TodoList(
    document.querySelector(`.${SELECTOR.TODO_LIST}`),
    {
      setTodos: (todos) => {
        this.setState({ todos });
        todoCount.changeSelected(this.state.filter);
      },
    }
  );

  const todoCount = new TodoCount(
    document.querySelector(`.${SELECTOR.COUNT_CONTAINER}`),
    {
      setFilter: (filter) => {
        this.setState({ filter });
      },
    }
  );

  this.render = () => {
    console.log("todoapp render");
    const filteredTodos = this.getFilteredTodos(this.state.filter);
    todoInput.toggleLoading(this.state.loading);
    todoList.render(filteredTodos, this.state.loading);
    todoCount.render(this.state.loading ? 0 : filteredTodos.length);
  };
}
