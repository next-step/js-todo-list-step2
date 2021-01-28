import { createElement } from "../lib/reilly/Reilly.js";

export function Skeleton() {
  return createElement(
    "li",
    null,
    createElement(
      "div",
      { className: "view" },
      createElement(
        "label",
        null,
        createElement(
          "div",
          { className: "animated-background" },
          createElement(
            "div",
            { className: "skel-mask-container" },
            createElement("div", { className: "skel-mask" })
          )
        )
      )
    )
  );
}
