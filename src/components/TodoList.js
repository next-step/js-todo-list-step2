import { PRIORITY } from '../constants/todo.js';
export default class TodoList {
  constructor({ $target, initialState, onClick, onChange, onKeypress }) {
    this.state = initialState;

    this.todoList = document.createElement('ul');
    this.todoList.className = 'todo-list';

    this.todoList.addEventListener('click', ({ target }) => {
      if (target.className !== 'toggle') return;
      const { id } = target.parentNode.parentNode.dataset;
      onClick(id);
    });

    this.todoList.addEventListener('change', ({ target }) => {
      if (target.tagName !== 'SELECT') return;
      const { id } = target.parentNode.parentNode.parentNode.dataset;
      const selectedItem = target.options[target.selectedIndex].value;
      onChange(id, PRIORITY[selectedItem]);
    });

    this.todoList.addEventListener('dblclick', ({ target }) => {
      if (target.className !== 'label') return;
      const todoItem = target.parentNode.parentNode;
      todoItem.className = 'editing';
    });

    this.todoList.addEventListener('keypress', ({ key, target }) => {
      if (key !== 'Enter' || target.value < 2) return;
      const { id } = target.parentNode.dataset;
      onKeypress(id, target.value);
    });

    window.addEventListener('click', ({ target }) => {
      if (target.className === 'edit') return;
      const edits = document.querySelectorAll('.editing');
      edits.forEach(todo => {
        todo.className = '';
      });
    });

    $target.appendChild(this.todoList);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
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
            <input class="toggle" type="checkbox"${isCompleted ? ' checked' : ''
            } />
            <label class="label">
               ${this.todoItemTemplate(priority)}
               ${contents}
            </label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="${contents}" />
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
