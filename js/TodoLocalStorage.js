// 지금은 사용하지 않는 스크립트. 삭제는 보류



import {chooseButton} from './ControlTodoButton.js'
import {listAssemble} from './AddNewItem.js'


export function initControlLocalStorage(){
  initLocalStorage();
  window.addEventListener("beforeunload", saveLocalStorage);
  window.addEventListener("DOMContentLoaded", loadLocalStorage);
};

function initLocalStorage(){
  if(localStorage.getItem("json")===null){
    let listArray = [];
    const jsonArray = JSON.stringify(listArray);
    localStorage.setItem("json", jsonArray);
  }
}


export function saveLocalStorage() {  
  //console.log(currentUserName);
    // 페이지 종료 시 현재 리스트를 저장하는 기능 
    const list = document.querySelectorAll(".todo-list>li");
    let listArray = [];
  
    for (let i = 0; i < list.length; i++) {
      let dataset = {__id : "", Checked: "", label: "", priority: "NONE"};
      if (list[i].classList.contains("completed")) {
        dataset.Checked = "checked";
      }
      dataset.__id = list[i].getAttribute('id');
      dataset.label = list[i].querySelector(".label>.text").innerText;

      const chip = list[i].querySelector("span.chip");
      if(chip.classList.contains("primary")) dataset.priority = "FIRST";
      else if (chip.classList.contains("secondary")) dataset.priority = "SECOND";
      listArray.push(dataset);
    }
  
    const jsonArray = JSON.stringify(listArray);
  
    //localStorage.setItem(currentUserName, jsonArray);
  }
  
  export function loadLocalStorage() {
    // 페이지 실행 시 현재 리스트를 불러오는 기능
    //const load = JSON.parse(localStorage.getItem(currentUserName));
    const load = JSON.parse(localStorage.getItem(''));
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
    const Id = e["__id"];
    const Priority = e["priority"]
  
    const li = listAssemble(Label);
    li.setAttribute('id', Id);

    const checkbox = li.querySelector(".toggle");
    const span = li.querySelector("span.chip");
  
    if (Checked === "checked") {
      checkbox.setAttribute("checked", "");
      li.classList.add("completed");
    }
    if(Priority!=="NONE"){
      if(Priority==="FIRST") {
        span.classList.add("primary");
        span.innerText = "1순위";
      }
      else if (Priority==="SECOND") {
        span.classList.add("secondary");
        span.innerText = "2순위";
      }
      li.querySelector("select").style.display="none";
    }
    
  }