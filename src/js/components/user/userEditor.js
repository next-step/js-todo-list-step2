export default function UserEditor(app) {

  this.render = div => {
    this.createButton = div.querySelector('[data-action="createUser"]');
    this.deleteButton = div.querySelector('[data-action="deleteUser"]');
    this.createButton.addEventListener("click", onUserCreateHandler);
  }

  const onUserCreateHandler = event => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    app.add(userName);
  }


}