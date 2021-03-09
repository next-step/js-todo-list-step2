import { initAddNewItem } from "./AddNewItem.js";
import { initTodolistButton } from "./ControlTodoButton.js";
import { initItemsEventListners } from "./ControlTodoItems.js";
import { initControlUserList } from "./ControlUserList.js";
import { ajaxGetFunctions } from "./AjaxGet.js";

const init = () => {
  ajaxGetFunctions("userlist");

  initAddNewItem();
  initTodolistButton();
  initItemsEventListners();
  initControlUserList();
};

init();
