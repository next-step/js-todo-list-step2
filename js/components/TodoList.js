import Reilly, { createElement } from "../lib/reilly/Reilly.js";
import { Skeleton } from "./Skeleton.js";
import TodoItem from "./TodoItem.js";

class TodoList extends Reilly.Component {
  render() {
    const {
      todos,
      editingId,
      onToggle,
      onRemove,
      onStartEdit,
      onConfirmEdit
    } = this.props;

    return createElement(
      "ul",
      {
        id: "todo-list",
        className: "todo-list",
        onchange: onToggle,
        onclick: onRemove,
        ondblclick: onStartEdit,
        onkeyup: onConfirmEdit
      },
      createElement(Skeleton),
      ...todos.map((todo) => createElement(TodoItem, { todo, editingId }))
    );
  }
}

export default TodoList;
