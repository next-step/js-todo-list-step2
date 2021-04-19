import { ASK_MESSAGE, ILLEGAL_MESSAGE } from "../../utils/Message.js";
import { checkEmpty, checkNull } from "../../utils/stringUtils.js";

export default function UserEditor(app) {
  let selectUserName;

  this.render = div => {
    this.createButton = div.querySelector('[data-action="createUser"]');
    this.deleteButton = div.querySelector('[data-action="deleteUser"]');
    this.createButton.addEventListener("click", onUserCreateHandler);
    this.deleteButton.addEventListener("click", onUserDeleteHandler);
  }

  this.changeUser = name => selectUserName = name;

  const onUserCreateHandler = event => {
    const userName = prompt(ASK_MESSAGE['ADD_NAME']);
    if (checkEmpty(userName)) {
      alert(ILLEGAL_MESSAGE['EMPTY_VALUE']);
    }
    app.add(userName);
  }

  const onUserDeleteHandler = event => {
    if(!checkNull(selectUserName) && confirm(ASK_MESSAGE['DELETE_NAME'](selectUserName))) {
      app.delete();
    }
  }
}
