import { todoView } from "/js/view/TodoView.js";
import { isEmpty } from "/js/utils/util.js";
import { $store } from "/js/store/index.js";
import { todoItemApi } from "/js/api/modules/todoItem.js";

function TodoWriterService() {
  this.todoView = todoView;

  this.addNewItem = async function (item, $newTodoTitle) {
    try {
      validate(item.title);

      const savedItem = await todoItemApi.saveItem(
        $store.member.getNowMember(),
        item.title
      );
      $store.todoItem.push(savedItem);
      this.todoView.itemRender($store.todoItem.getItemsByFilter());
      clear($newTodoTitle);
    } catch (e) {
      alert(e.message);
    }
  };

  const validate = (title) => {
    if (isEmpty(title) || title.length < 2) {
      throw new Error("2글자 이상의 내용을 입력해주세요");
    }
  };

  function clear($newTodoTitle) {
    $newTodoTitle.value = "";
  }
}

export const todoWriterService = new TodoWriterService();
