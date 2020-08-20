function TodoList($target, todoItems, deleteTodo) {
  this.$target = $target;
  this.state = {
    todoItems,
  };
  this.deleteTodo = deleteTodo;

  this.setState = (todoItems) => {
    this.state.todoItems = todoItems;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
    ${this.state.todoItems.map(({ _id, contents, isCompleted }) =>
      isCompleted
        ? `
            <li data-id=${_id}>
                <div class="view">
                    <input class="toggle" type="checkbox" checked/>
                    <label class="label">${contents}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="완료된 타이틀" />
            </li>`
        : `
            <li data-id=${_id}>
                <div class="view">
                    <input class="toggle" type="checkbox" />
                    <label class="label">${contents}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="완료된 타이틀" />
            </li>
        `
    ).join('')}
    `;
  };

  this.clickHandler = (evt) => {
    if(evt.target.tagName === 'BUTTON') {
        this.deleteTodo(evt.target.closest('li').dataset.id);
    }
  }
  this.$target.addEventListener('click', this.clickHandler);

  this.render();
}

export default TodoList;
