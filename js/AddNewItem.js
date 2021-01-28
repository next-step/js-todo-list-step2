import { renewStrong } from "./ControlTodoButton.js";
import { ajaxPostUserItem } from "./ControlUserList.js"

const getWork = document.querySelector(".new-todo"); 
export const todoList = document.querySelector(".todo-list"); 

export function initAddNewItem() {
  getWork.addEventListener("keypress", AddNewList);
}

export function AddNewList(e) {
  if (e.key !== "Enter") return;
  if(e.target.value.length===1){
    alert("두 글자 이상 입력해주세요!");
    return;
  }
  else if (e.target.value !== "" && !/^\s+|\s+$/g.exec(e.target.value)) {
    const text = e.target.value;
    e.target.value = null;

    let dataset = {
      contents: text
    };

    ajaxPostUserItem(dataset);

  } else {
    alert("불필요한 공백을 제거해주세요!");
  }
  renewStrong();
}

export function listAssemble(content) {
  const li = document.createElement("li");
  
  const listTemplate = `<div class="view">
                        <input class="toggle" type="checkbox"/>
                        <label class="label">
                          <select class="chip">
                            <option value="0" selected>순위</option>
                            <option value="1">1순위</option>
                            <option value="2">2순위</option>
                          </select>
                          <span class="chip">1순위</span>
                          <span class="text">${content}</span>
                        </label>
                        <button class="destroy" ></button>
                      </div>
                      <input class="edit" value="${content}" />`;

  li.innerHTML = listTemplate;
  todoList.append(li);

  return li;
}
