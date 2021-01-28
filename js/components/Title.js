import { createElement } from "../lib/reilly/Reilly.js";

function Title(props) {
  const { id, user } = props;
  return createElement(
    "h1",
    { id },
    createElement(
      "span",
      null,
      user && createElement("strong", null, user.name),
      user && "'s Todo List ",
      !user && "Todo List"
    )
  );
}

export default Title;
