import { checkNull } from "../../utils/stringUtils.js";

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
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    app.add(userName);
  }

  const onUserDeleteHandler = event => {
    if(!checkNull(selectUserName) && confirm(`${selectUserName}을 삭제하시겠습니까?`)) {
      app.delete();
    }
  }


}