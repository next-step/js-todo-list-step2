import { TodoItem } from "./Todo.js";
import { $, $$ } from "../../util/domSelection.js";
export class TodoStatusContainer {
  static FILTER_STATE = {
    ALL:'all',
    ACTIVE:'active',
    COMPLETED:'completed',
    //PRIORITY:'priority'
  };

  constructor(todoApp) {
    this.todoApp = todoApp;
    this.buttons = {
      all: $(".count-container ." + TodoStatusContainer.FILTER_STATE.ALL),
      active: $(".count-container ." + TodoStatusContainer.FILTER_STATE.ACTIVE),
      completed: $(".count-container ." + TodoStatusContainer.FILTER_STATE.COMPLETED),
    };
    Object.entries(this.buttons).forEach( ([filterState,button]) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        todoApp.changeFilter(filterState);
      });
    });

    const deleteAllButton =$(".count-container .clear-completed" );
    deleteAllButton.addEventListener("click", async () => await todoApp.deleteItemAll());
  }

  hideSelectedFilter(){
    $$(".count-container a").forEach((button) =>
      button.classList.remove("selected")
    ); 
  }
  showSelectedFilter(filterState){
    const todoListLi = $$(".todo-list li");
    this.buttons[filterState].classList.add("selected");
    if (filterState == TodoStatusContainer.FILTER_STATE.ALL) {
      todoListLi.forEach((li) => (li.style.display = ""));
      return;
    }
    todoListLi.forEach((li) => {
      if (!li.classList.contains(filterState))
        li.style.display = "none";
      else li.style.display = "";
    });
  };

  

  setState(filterState) {
    
    this.hideSelectedFilter();
    this.showSelectedFilter(filterState);
    
    let count = 0;
    $$(".todo-list li").forEach((li) => {
      if (li.style.display != "none") count = count + 1;
    });
    $(".todo-count strong").textContent = count;

  }
}
