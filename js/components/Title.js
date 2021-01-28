import { createElement } from "../lib/reilly/Reilly.js";

function Title({ children }) {
  return createElement("h1", null, ...children);
}

export default Title;
