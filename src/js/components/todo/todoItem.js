export function TodoItem(id, inputContent, inputPriority="NONE", completed=false) {
  const _id = id;
  let content = inputContent;
  let priority = inputPriority;
  let isCompleted = completed;

  this.complete = () => isCompleted = !isCompleted;
  this.matchId = id => _id === id;
  this.changeContent = newContent => content = newContent;
  this.changePriority = newPriority => priority = newPriority;

  this.getId = () => _id;
  this.getContent = () => content;
  this.getPriority = () => priority;
  this.isCompleted = () => isCompleted;
}

const priority = {
  NONE: `<select class="chip select" data-action="selectPriority" selectpriority="change">
        <option value="NONE" selected="">순위</option>
        <option value="FIRST">1순위</option>
        <option value="SECOND">2순위</option>
        </select>`,
  FIRST: `<span class="chip primary">1순위</span>`,
  SECOND: `<span class="chip secondary">2순위</span>`
}


export const todoTemplate = item => {
  return `<li class="${item.isCompleted() ? "completed" : ""}" data-id="${item.getId()}">
        <div class="view">
          <input class="toggle" type="checkbox" data-action="toggleTodo" toggletodo="click">
          <label class="label" data-action="toggleEditingTodo" toggleeditingtodo="dblclick">
          ${priority[item.getPriority()]}
            ${item.getContent()}
          </label>
          <button class="destroy" data-action="deleteTodo" deletetodo="click"></button>
        </div>
        <input class="edit" value="${item.getContent()}">
      </li>`;
}

export const parseItem = item => new TodoItem(item._id, item.contents, item.priority, item.isCompleted);