import { TodoItem } from "./TodoItem.js";
import { $, $$ } from "../../util/domSelection.js";
export class TodoList {
  constructor(todoApp) {
    this.todoApp = todoApp;

    const list = $(".todo-list");
    
    list.addEventListener("click", async function (e) {
      if (e.target && e.target.className == "destroy") {
        const targetLi = e.target.closest("li");
        const itemId =targetLi.dataset.itemid;
        await todoApp.deleteItem(itemId);
        targetLi.outerHTML = "";
      }
    });
    list.addEventListener("click",async function (e) {
      if (e.target && e.target.className == "toggle") {
        const targetLi = e.target.closest("li");
        await todoApp.updateItemState(targetLi.dataset.itemid);
      }
    });

    list.addEventListener("dblclick", function (e) {
      if (e.target && e.target.nodeName == "LABEL") {
        const targetLi = e.target.closest("li");
        targetLi.classList.add("editing");
      }
    });
    list.addEventListener("keydown", async function (e) {
      if (e.target && e.target.nodeName == "INPUT") {
        const targetLi = e.target.closest("li");
        if (e.key == "Escape") {
          targetLi.classList.remove("editing");
        } else if (e.key == "Enter") {
          await todoApp.updateItem(targetLi.dataset.itemid, e.target.value);
          targetLi.classList.remove("editing");
        }
      }
    });
  }
  setState(todoItemArray) {
    const list = $(".todo-list");
    list.innerHTML = "";
    let li;
    todoItemArray.forEach((item) => {
      li = document.createElement("li");
      const itemIdAttribute = document.createAttribute("data-itemid");
      itemIdAttribute.value = item._id;
      li.setAttributeNode(itemIdAttribute);

      if (item.isCompleted) {
        const liClass = document.createAttribute("class");
        liClass.value = TodoItem.COMPLETED;
        li.setAttributeNode(liClass);
      } else  {
        const liClass = document.createAttribute("class");
        liClass.value = TodoItem.ACTIVE;
        li.setAttributeNode(liClass);
      }
      li.innerHTML = `
              <div class="view">
                  <input class="toggle" type="checkbox" ${
                    item.isCompleted ? "checked" : ""
                  }/>
                  <label class="label">${item.data}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="${item.data}" />
              `;
      list.appendChild(li);
    });
  }
}
