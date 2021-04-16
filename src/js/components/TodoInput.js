import { getEl } from "@js/util";
import { addTodoItem } from "@lib/api";
import { KEY, VALIDATION, MESSAGES } from "@constants/constant";

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
    if (target.value.length < VALIDATION.MIN_TODO_CONTENTS_LENGTH) return alert(MESSAGES.INVALID_ADD_TODO);

    const { selectedUser } = this.store.get();
    const { data } = await addTodoItem({ userId: selectedUser._id, contents: target.value });
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
