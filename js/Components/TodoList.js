function TodoList($target, todoItems) {
  this.$target = $target;
  this.state = {
    todoItems,
  };

  this.setState = (todoItems) => {
    this.state.todoItems = todoItems;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
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
    )}
    `;
  };

  this.render();
}

export default TodoList;
