import { getEl } from "@js/util";
import { KEY } from "@constants/constant";
import { addTodoItem } from "@lib/api";

class TodoInput {
  constructor(store) {
    this.store = store;
    this.inputEl = getEl("input.new-todo");
    this.init();
  }

  init() {
    this.inputEl.addEventListener("keyup", this.addTodoHandler.bind(this));
  }

  async addTodoHandler({ key, target }) {
    if (key !== KEY.ENTER || !target.value) return;
    const { selectedUser } = this.store.get();
    const { data } = await addTodoItem({ _id: selectedUser._id, contents: target.value });
    const _todoList = [...selectedUser.todoList, data]
    target.value = "";

    this.store.set({
      selectedUser: {
        ...selectedUser,
        todoList: [..._todoList],
      },
    });
  }
}

export default TodoInput;
