import Reilly, { createElement } from "../lib/reilly/Reilly.js";

class TodoItem extends Reilly.Component {
  render() {
    const { todo, editingId } = this.props;

    return createElement(
      "li",
      {
        id: todo.id,
        className: `${todo.completed ? "completed" : ""} ${
          todo.id === editingId ? "editing" : ""
        }`
      },
      createElement(
        "div",
        { className: "view" },
        createElement("input", {
          type: "checkbox",
          className: `toggle ${todo.completed ? "checked" : ""}`,
          checked: todo.completed
        }),
        createElement("label", { className: "label" }, todo.content),
        createElement("button", { className: "destroy" })
      ),
      createElement("input", {
        className: "edit",
        value: todo.content
      })
    );
  }
}

export default TodoItem;
