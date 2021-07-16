export default class TodoList {
  constructor({ $target, initialState }) {
    this.state = initialState;

    this.todoList = document.createElement('ul');
    this.todoList.className = 'todo-list';

    $target.appendChild(this.todoList);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    console.log(this.state.todoList);
    if (this.state.isLoading)
      this.todoList.innerHTML = `
        <li>
            <div class="view">
            <label class="label">
                <div class="animated-background">
                <div class="skel-mask-container">
                    <div class="skel-mask"></div>
                </div>
                </div>
            </label>
            </div>
        </li>
        `;
    else
      this.todoList.innerHTML = `${this.state.todoList
        .map(({ _id, contents, isCompleted, priority }) => {
          return `
        <li data-id="${_id}"${isCompleted ? ' class="completed"' : ''}>
            <div class="view">
            <input class="toggle" type="checkbox"${
              isCompleted ? ' checked' : ''
            } />
            <label class="label">
               ${this.todoItemTemplate(priority)}
               ${contents}
            </label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="완료된 타이틀" />
        </li>
        `;
        })
        .join('')}`;
  }

  todoItemTemplate(priority) {
    if (priority === 'FIRST') return `<span class="chip primary">1순위</span>`;
    else if (priority === 'SECOND')
      return `<span class="chip secondary">2순위</span>`;
    else
      return `<select class="chip select">
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>`;
  }
}
