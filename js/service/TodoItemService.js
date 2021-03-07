import { todoView } from "/js/view/TodoView.js";
import { $store } from "/js/store/index.js";
import { todoItemApi } from "/js/api/modules/todoItem.js";

function TodoItemService() {
  this.todoView = todoView;

  this.toggle = async (target) => {
    const itemId = target.dataset.id;
    await todoItemApi.toggleItem($store.member.getNowMember(), itemId);
    $store.todoItem.toggle(itemId);
    target.classList.toggle("completed");
  };

  this.destroy = async (target) => {
    if (confirm("삭제하시겠습니까?")) {
      const itemId = target.dataset.id;
      await todoItemApi.deleteItem(
        $store.member.getNowMember(),
        itemId
      );
      $store.todoItem.destroy(itemId);
      this.todoView.itemRender();
    }
  };

  this.onEdit = (item) => {
    item.classList.add("editing");
  };

  this.edit = async (id, contents) => {
    await todoItemApi.editItem($store.member.getNowMember(), id, contents);
    $store.todoItem.edit(id, contents);
    this.todoView.itemRender($store.todoItem.items);
  };
}

export const todoItemService = new TodoItemService();
