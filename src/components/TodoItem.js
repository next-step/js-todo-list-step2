const TodoItem = () => {
  const render = (todo) => `
        <li data-id="${todo._id}">
          <div class="view">
            <input class="toggle" type="checkbox"  ${todo.isCompleted ? 'checked' : ''}/>
            <label class="label">
              <select class="chip select">
                <option value="0" ${todo.priority === 'NONE' ? 'selected' : ''}>순위</option>
                <option value="1" ${todo.priority === 'FIRST' ? 'selected' : ''}>1순위</option>
                <option value="2" ${todo.priority === 'SECOND' ? 'selected' : ''}>2순위</option>
              </select>
              <span>${todo.contents}</span>
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todo.contents}" />
        </li>
        `;

  return {
    render,
  };
};

export default TodoItem;
