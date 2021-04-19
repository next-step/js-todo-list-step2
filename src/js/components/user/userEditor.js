import { ASK_MESSAGE, ILLEGAL_MESSAGE } from "../../utils/Message.js";
import { checkEmpty, checkNull } from "../../utils/stringUtils.js";

export default function UserEditor(app) {
  const createButton = document.querySelector('[data-action="createUser"]');
  const deleteButton = document.querySelector('[data-action="deleteUser"]');
  let selectUserName;

  this.changeUser = name => selectUserName = name;

  const onUserCreateHandler = () => {
    const userName = prompt(ASK_MESSAGE['ADD_NAME']);
    if (checkEmpty(userName)) {
      alert(ILLEGAL_MESSAGE['EMPTY_VALUE']);
      return;
    }
    app.add(userName);
  }

  const onUserDeleteHandler = () => {
    if(!checkNull(selectUserName) && confirm(ASK_MESSAGE['DELETE_NAME'](selectUserName))) {
      app.delete();
    }
  }

  createButton.addEventListener("click", onUserCreateHandler);
  deleteButton.addEventListener("click", onUserDeleteHandler);
}
