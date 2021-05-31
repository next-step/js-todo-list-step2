export const getTodoList = (user) => user.todoList || [];

export const getTodoItemId = (todoItem) => todoItem._id;
export const getTodoItemContents = (todoItem) => todoItem.contents;
export const getTodoItemIsCompleted = (todoItem) => todoItem.isCompleted;
export const getTodoItemPriority = (todoItem) => todoItem.priority;

export const PRIORITY_TEMPLATE = {
  FIRST: `<span class="chip primary">1순위</span>`,
  SECOND: `<span class="chip secondary">2순위</span>`,
  NONE: `
    <select class="chip select">
      <option value="NONE" selected>순위</option>
      <option value="FIRST">1순위</option>
      <option value="SECOND">2순위</option>
    </select>
  `,
};
