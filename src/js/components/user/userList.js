import { getButtonId, isUserTarget } from "../../utils/eventUtils.js";
import { UserTemplate } from "./user.js";

export default function UserList(app, userEditor) {
  const userList = document.querySelector("#user-list");

  this.render = users => {
    const template = users.map(user => UserTemplate(user));
    userList.innerHTML = template.join("\n") + "<div>\n" + userList.querySelector("div").innerHTML + "\n</div>\n";
    userEditor.render(userList);
  }

  const onClickHandler = event => {
    if (isUserTarget(event)) {
      app.active(getButtonId(event));
    }
  }

  userList.addEventListener("click", onClickHandler);
}
