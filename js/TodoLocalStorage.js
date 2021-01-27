import {chooseButton} from './ControlTodoButton.js'
import {listAssemble} from './AddNewItem.js'


export function initControlLocalStorage(){
  window.addEventListener("beforeunload", saveLocalStorage);
  window.addEventListener("DOMContentLoaded", loadLocalStorage);
};

function createUniqueId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}





function saveLocalStorage() {
    // 페이지 종료 시 현재 리스트를 저장하는 기능
    const list = document.querySelectorAll(".todo-list>li");
    let listArray = [];
  
    for (let i = 0; i < list.length; i++) {
      let dataset = {Checked: "", label: "" };
      if (list[i].classList.contains("completed")) {
        dataset.Checked = "checked";
      }
      dataset.label = list[i].querySelector(".label>.text").innerText;
      listArray.push(dataset);
    }
  
    const jsonArray = JSON.stringify(listArray);
  
    localStorage.setItem("json", jsonArray);
  }
  
  function loadLocalStorage() {
    // 페이지 실행 시 현재 리스트를 불러오는 기능
    const load = JSON.parse(localStorage.getItem("json"));
    for (let i in load) {
      getLocalStorageList(load[i]);
    }
    if (/(active)/.exec(window.location.href)) chooseButton('active');
    else if (/(completed)/.exec(window.location.href)) chooseButton('completed');
    else chooseButton('all');
  }

  function getLocalStorageList(e) {
    // 페이지 실행 시 현재 리스트를 불러오는 기능
    const Checked = e["Checked"];
    const Label = e["label"];
  
    const li = listAssemble(Label);
    const checkbox = li.querySelector(".toggle");
  
    if (Checked === "checked") {
      checkbox.setAttribute("checked", "");
      li.classList.add("completed");
    }
  }