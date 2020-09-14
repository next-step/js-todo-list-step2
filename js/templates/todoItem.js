const createTodoItem = (_id, contents, isCompleted, priority) => `
  <li class="${isCompleted ? 'completed' : ''}" data-key="${_id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
      <label class="label">
        ${createPrioritySelect(priority)}
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>
`;

const createPrioritySelect = (priority) => {
  switch (priority) {
    case 'FIRST':
    case '1':
      return `
          <select class="chip select primary">
            <option value="1" selected >1순위</option>
            <option value="2">2순위</option>
            <option value="0">미지정</option>
          </select>
          `;

    case 'SECOND':
    case '2':
      return `
          <select class="chip select secondary">
            <option value="2" selected>2순위</option>
            <option value="1">1순위</option>
            <option value="0">미지정</option>
          </select>
        `;

    default:
      return `
          <select class="chip select ">
            <option value="0" selected >순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
        `;
  }
};

export default createTodoItem;
