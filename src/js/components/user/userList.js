import { getButtonId, isUserTarget } from "../../utils/eventUtils.js";
import { UserTemplate } from "./user.js";

export default function UserList(app) {
  const userList = document.querySelector("#user-list").querySelector(".users");

  this.render = users => {
    const template = users.map(user => UserTemplate(user));
    userList.innerHTML = template.join("\n") + "<div>\n";
  }

  const onClickHandler = event => {
    if (isUserTarget(event)) {
      app.active(getButtonId(event));
    }
  }

  userList.addEventListener("click", onClickHandler);
}
