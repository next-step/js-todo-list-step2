import { initAddNewItem } from "./AddNewItem.js";
import { initTodolistButton } from "./ControlTodoButton.js";
import { initControlLocalStorage } from "./TodoLocalStorage.js";
import { initTodolistItems } from "./ControlTodoItems.js";

function init() {
  // 페이지 로드 시 이벤트 리스너 부착
  initAddNewItem();
  initTodolistButton();
  initControlLocalStorage();
  initTodolistItems();
}

init();



// const onUserCreateHandler = () => {
//   const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
// }

// const userCreateButton = document.querySelector('.user-create-button')
// userCreateButton.addEventListener('click', onUserCreateHandler)

