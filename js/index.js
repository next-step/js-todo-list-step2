import { initAddNewItem } from "./AddNewItem.js";
import { initTodolistButton } from "./ControlTodoButton.js";
import { initTodolistItems } from "./ControlTodoItems.js";
import { initControlUserList, ajaxGetUserList } from "./ControlUserList.js";



const init = () => {
  // 페이지 로드 시 이벤트 리스너 부착
  ajaxGetUserList();
  
  initAddNewItem();
  initTodolistButton();
  initTodolistItems();
  initControlUserList();
}

init();







