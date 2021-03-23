import $ from "../../utils/Selector.js"
import {priorityFiltering} from "../../utils/PriorityFIlter.js";
import Validation from "../../utils/Validation.js";
import Key from "../../utils/Key.js";
import {removeOneTodoItem, updateContent} from "../../utils/APIs.js";

export default function TodoItem({_id: userId, todoList, updateTodoItem, removeTodoItemByItemId}) {

  const $todoList = $.single(".todo-list");

  this.renderItem = () => {
    const items = todoList.map(render)
    $todoList.innerHTML = items.join("");
    initEventListener();
  }

  const initEventListener = () => {
    $.multi(".todo-list li").forEach(v => {
      v.addEventListener("click", clickEventListener)
      v.addEventListener("dblclick", dblclickEventListener)
      v.addEventListener("keyup", editEventListener)
    });
  }

  const findClassList = target => {
    return target.classList;
  }

  const clickEventListener = async ({target}) => {
    const classes = findClassList(target);

    if (Validation.includeClass(classes, "toggle")) {
      alert("체크")
    }

    if (Validation.includeClass(classes, "destroy")) {

      if (!confirm("해당 TodoItem을 삭제하시겠습니까?")) {
        return;
      }

      const {id: itemId} = target.closest("li")
      removeTodoItemByItemId(await removeOneTodoItem({_id: userId, _itemId: itemId}))
    }
  }

  const dblclickEventListener = ({target}) => {
    const classes = findClassList(target);
    if (Validation.includeClass(classes, "label")) {
      target.closest("li").classList.add("editing")
    }
  }

  const editEventListener = async ({keyCode, target}) => {

    if (Key.isEsc(keyCode)) {
      target.closest("li").classList.remove("editing")
      return;
    }


    if (Key.isEnter(keyCode)) {
      const {value: contents} = target;
      const {id: _itemId} = target.closest("li")
      updateTodoItem(await updateContent({_id: userId, _itemId, contents}));
    }
  }

  const priorityRenderType = (priority) => {
    return priorityFiltering(priority)
  }

  const render = ({contents, isCompleted, priority, _id: itemId}) => {
    return `
      <li id="${itemId}" class="${isCompleted ? "completed" : ""}">
       <div class="view">
         <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}/>
         <label class="label">
           ${priorityRenderType(priority)}
           ${contents}
         </label>
         <button class="destroy"></button>
       </div>
       <input class="edit" value="${contents}" />
     </li>`;
  }
}
