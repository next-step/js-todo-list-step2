import { createElement } from "../lib/reilly/Reilly.js";

export function ToggleAll() {
  return createElement("input", {
    className: "toggle-all",
    type: "checkbox"
  });
}
