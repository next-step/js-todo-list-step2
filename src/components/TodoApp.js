import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";
import TodoInput from "./TodoInput.js";
import { SELECTOR, FILTER } from "../utils/constants.js";
import * as todoApi from "../apis/todo.js";

export default function TodoApp($todoApp) {
  this.state = {
    todos: [],
    filter: location.hash.replace("#/", ""),
    loading: true,
  };
  this.username = "";

  this.setUsername = (username) => {
    this.username = username;
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

  this.loadTodosByUsername = async () => {
    this.setState({ loading: true });
    try {
      const todos = await todoApi.getTodosByUsername(this.username);
      this.setState({ todos: todos || [], loading: false });
      todoCount.changeSelected(this.state.filter);
    } catch (error) {
      console.log(error);
    }
  };

  const todoInput = new TodoInput(
    $todoApp.querySelector(`.${SELECTOR.NEW_TODO}`),
    {
      onAdd: async (contents) => {
        try {
          const newTodo = await todoApi.addTodo(this.username, contents);
          this.setState({ todos: [...this.state.todos, newTodo] });
        } catch (error) {
          console.log(error);
        }
      },
    }
  );

  const todoList = new TodoList(
    document.querySelector(`.${SELECTOR.TODO_LIST}`),
    {
      deleteTodo: async (id) => {
        try {
          await todoApi.deleteTodo(this.username, id);
          this.setState({
            todos: this.state.todos.filter((todo) => id !== todo._id),
          });
        } catch (error) {
          console.log(error);
        }
      },
      toggleTodo: async (id) => {
        try {
          await todoApi.toggleTodo(this.username, id);
          this.setState({
            todos: this.state.todos.map((todo) => {
              if (id === todo._id) {
                todo.isCompleted = !todo.isCompleted;
              }
              return todo;
            }),
          });
        } catch (error) {
          console.log(error);
        }
      },
      editTodo: async (id, contents) => {
        try {
          await todoApi.editTodoContents(this.username, id, contents);
          this.setState({
            todos: this.state.todos.map((todo) => {
              if (id === todo._id) {
                todo.contents = contents;
              }
              return todo;
            }),
          });
        } catch (error) {
          console.log(error);
        }
      },
      changePriorityTodo: async (id, priority) => {
        try {
          await todoApi.changeTodoPriority(this.username, id, priority);
          this.setState({
            todos: this.state.todos.map((todo) => {
              if (id === todo._id) {
                todo.priority = priority;
              }
              return todo;
            }),
          });
        } catch (error) {
          console.log(error);
        }
      },
    }
  );

  const todoCount = new TodoCount(
    document.querySelector(`.${SELECTOR.COUNT_CONTAINER}`),
    {
      setFilter: (filter) => {
        this.setState({ filter });
      },
      deleteAllTodo: async () => {
        const failedTodoIds = [];

        await this.state.todos.map((todo) =>
          todoApi.deleteTodo(this.username, todo._id).catch((error) => {
            failedTodoIds.push(todo._id);
            console.log(error);
          })
        );

        this.setState({
          todos: this.state.todos.filter((todo) =>
            failedTodoIds.includes(todo._id)
          ),
        });
      },
    }
  );

  const prioritySort = (a, b) => {
    if (a.isCompleted) {
      return 1;
    }

    if (b.isCompleted) {
      return -1;
    }

    if (a.priority === 0) {
      return 1;
    }
    if (b.priority === 0) {
      return -1;
    }

    return a.priority < b.priority ? -1 : 1;
  };

  this.render = () => {
    const filteredTodos = this.getFilteredTodos(this.state.filter);
    filteredTodos.sort(prioritySort);
    todoInput.toggleLoading(this.state.loading);
    todoList.render(filteredTodos, this.state.loading);
    todoCount.render(this.state.loading ? 0 : filteredTodos.length);
  };
}
