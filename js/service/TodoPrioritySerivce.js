import { priorityValueConverter } from "/js/utils/priorityConverter.js";
import { todoItemApi } from "/js/api/modules/todoItem.js";
import { $store } from "/js/store/index.js";
import { todoView } from "/js/view/TodoView.js";

function TodoPriorityService() {
  this.setPriority = async (itemId, priorityValue) => {
    const priority = priorityValueConverter(priorityValue);
    const updatedItem = await todoItemApi.setPriority(
      $store.member.getNowMember(),
      itemId,
      priority
    );
    $store.todoItem.edit(itemId, updatedItem);
    todoView.itemRender();
  };
}

export const todoPriorityService = new TodoPriorityService();
