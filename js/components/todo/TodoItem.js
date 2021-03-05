import $ from "../../utils/Selector.js"
import {priorityFiltering} from "../../utils/PriorityFIlter.js";

export default function TodoItem() {

  const $todoList = $.single(".todo-list");

  const renderItem = todoList => {
    const items = todoList.map(render)

    $todoList.innerHTML = items.join("");
    initEventListener();
  }

  const initEventListener = () => {
    $.multi(".todo-list li").forEach(v => {
      v.addEventListener("click" ,clickEventListener)
    });
  }

  const clickEventListener = ({target}) => {
    console.log(target)
  }

  const priorityRenderType = (priority) =>{
    return priorityFiltering(priority)
  }

  const render = ({contents, isCompleted, priority, _id}) => {
    console.log({contents, isCompleted, priority, _id})
    return `
      <li class="${isCompleted ? "completed" : ""}">
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
