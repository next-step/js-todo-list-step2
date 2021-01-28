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
        //   <select class="chip select">
        //   <option value="0" selected>순위</option>
        //   <option value="1">1순위</option>
        //   <option value="2">2순위</option>
        // </select>
        createElement(
          "label",
          { className: "label" },
          createElement(
            "select",
            { className: "chip select" },
            createElement(
              "option",
              { value: "0", selected: "selected" },
              "순위"
            ),
            createElement("option", { value: "1" }, "1순위"),
            createElement("option", { value: "2" }, "2순위")
          ),
          todo.content
        ),
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
