import $ from "../../utils/Selector.js"
import {priorityFiltering} from "../../utils/PriorityFIlter.js";

export default function TodoItem({_id, todoList}) {

  const $todoList = $.single(".todo-list");

  const renderItem = () => {
    const items = todoList.map(render)
    $todoList.innerHTML = items.join("");
    initEventListener();
  }

  const initEventListener = () => {
    $.multi(".todo-list li").forEach(v => {
      v.addEventListener("click" ,clickEventListener)
      v.addEventListener("dblclick", dblclickEventListener)
    });
  }

  const findClassList = target => {
    return target.classList;
  }

  const clickEventListener = ({target}) => {
    const classes = findClassList(target);

    if(classes.contains("toggle")) {
      alert("체크")
    }

    if(classes.contains("destroy")) {
      alert("삭제")
    }
  }

  const dblclickEventListener = ({target}) => {
    const classes = findClassList(target);
    console.log(target);
    if(classes.contains("label")) {
      alert("수정")
    }
  }

  const priorityRenderType = (priority) =>{
    return priorityFiltering(priority)
  }

  const render = ({contents, isCompleted, priority, _id}) => {
    return `
      <li id="${_id}" class="${isCompleted ? "completed" : ""}">
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

  return {
    renderItem
  }
}
