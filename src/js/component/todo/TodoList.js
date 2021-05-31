import { TodoItem } from "./TodoItem.js";
import { $ } from "../../util/domSelection.js";
export class TodoList {
  constructor(todoApp) {
    this.todoApp = todoApp;

    const list = $(".todo-list");
    
    list.addEventListener("click", async ({target}) => {
      if (!target) return;
      if (target.className == "destroy") {
        const targetLi = target.closest("li");
        const itemId =targetLi.dataset.itemid;
        await todoApp.deleteItem(itemId);
        targetLi.outerHTML = "";
      }
    });
    list.addEventListener("click", async ({target}) => {
      if (!target) return;
      if (target.className == "toggle") {
        const targetLi = target.closest("li");
        await todoApp.updateItemState(targetLi.dataset.itemid);
      }
    });

    list.addEventListener("dblclick", ({target}) => {
      if (!target) return;
      if (target.nodeName == "LABEL") {
        const targetLi = target.closest("li");
        targetLi.classList.add("editing");
      }
    });
    list.addEventListener("keydown", async ({target,key}) => {
      if (!target) return;
      if (target.nodeName == "INPUT") {
        const targetLi = target.closest("li");
        if (key == "Escape") {
          targetLi.classList.remove("editing");
        } else if (key == "Enter") {
          await todoApp.updateItem(targetLi.dataset.itemid, target.value);
          targetLi.classList.remove("editing");
        }
      }
    });
    list.addEventListener("change", async ({target}) => {
      if (!target) return;
      if (target.nodeName == "SELECT" && target.classList.contains('chip')) {
        const targetLi = target.closest("li");
        const selectedIndex = target.options.selectedIndex;
        const priority = target.options[selectedIndex].value;
        await todoApp.updateItemPriority(targetLi.dataset.itemid,priority);
      }
    });
  }
  setState(todoItemArray) {
    const list = $(".todo-list");
    list.innerHTML = "";
    let li;
    const priorityDom = {
      'NONE':`<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>`,
      'FIRST' :`<span class="chip ${TodoItem.PRIORITY_FIRST_CLASSNAME}">1순위</span>`,
      'SECOND':`<span class="chip ${TodoItem.PRIORITY_SECOND_CLASSNAME}">2순위</span>`
    };
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
                  <label class="label">
                  ${item.isCompleted ? "" :  
                    item.priority == TodoItem.PRIORITY_NONE ? priorityDom.NONE :
                    item.priority == TodoItem.PRIORITY_FIRST ? priorityDom.FIRST: priorityDom.SECOND
                  }
                  ${item.data}
                  </label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="${item.data}" />
              `;
      list.appendChild(li);
    });
  }
}
