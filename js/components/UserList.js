import Reilly, { createElement } from "../lib/reilly/Reilly.js";

export class UserList extends Reilly.Component {
  render() {
    return createElement(
      "section",
      null,
      createElement(
        "button",
        { className: "ripple user-create-button" },
        "유저 생성"
      ),
      createElement(
        "div",
        { id: "user-list" },
        createElement("button", { className: "ripple active" }, "eastjun"),
        createElement("button", { className: "ripple" }, "westjun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "westjun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "westjun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "westjun"),
        createElement("button", { className: "ripple" }, "hojun"),
        createElement("button", { className: "ripple" }, "hojun")
      )
    );
  }
}
