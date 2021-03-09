import { renewItemCount } from "./ControlTodoButton.js";
import { ajaxPostFunctions } from "./AjaxPost.js";
import { currentUserID } from "./ControlUserList.js";

const getWork = document.querySelector(".new-todo");
export const MINIMUN_INPUT_LENGTH = 2;
export const todoList = document.querySelector(".todo-list");

export const initAddNewItem = () => {
  getWork.addEventListener("keypress", addNewList);
};

const addNewList = (e) => {
  if (currentUserID === "") {
    alert("유저를 먼저 선택해주세요!");
    return;
  }
  if (e.key !== "Enter") return;
  if (e.target.value.length < MINIMUN_INPUT_LENGTH) {
    alert(`${MINIMUN_INPUT_LENGTH}글자 이상 입력해주세요!`);
    return;
  }
  const text = e.target.value;
  e.target.value = null;

  ajaxPostFunctions(text, "useritem");
  renewItemCount();
};

export const listAssemble = (content) => {
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
};
