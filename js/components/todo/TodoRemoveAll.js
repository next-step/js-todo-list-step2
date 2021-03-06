import $ from "../../utils/Selector.js";
import {removeAllTodoItem} from "../../utils/APIs.js";


export default function TodoRemoveAll({_id,name ,removeTodoItemAll}) {
  this.$removeAll = $.single(".clear-completed")

  this.initEventListener = () => {
    this.$removeAll.addEventListener("click", async () => {
      if (!confirm("모두 삭제 하시겠습니까?")) return;
      await removeAllTodoItem(_id)
      removeTodoItemAll({_id, name , todoList : []});
    })
  }

  this.render = () => {
    this.initEventListener();
  }
}