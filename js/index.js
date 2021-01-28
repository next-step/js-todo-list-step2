import { initAddNewItem } from "./AddNewItem.js";
import { initTodolistButton } from "./ControlTodoButton.js";
import { initTodolistItems } from "./ControlTodoItems.js";
import { initControlUserList, ajaxGetFunctions } from "./ControlUserList.js";



const init = () => {
  // 페이지 로드 시 이벤트 리스너 부착
  ajaxGetFunctions('userlist');

  initAddNewItem();
  initTodolistButton();
  initTodolistItems();
  initControlUserList();
}

init();







