export const TODOCOUNT = (data, filteredData) => {
  return `
      <span id="todo-count" class="todo-count">
        총 <span class="count">${data.length}</span> 개 중
      </span>
      <span id="completed-count" class="todo-count">
        <span class="count">${filteredData.length}</span> 개 완료
      </span>
  `;
};

export const TODOLIST = (data) => {
  const result = data
    .map((todo) => {
      return `
        <li ${todo.isCompleted ? 'class=completed' : ''} data-id=${todo._id}>
          <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.isCompleted ? 'checked' : ''
            } />
            <label class="label">${todo.contents}</label>
            <button class="delete"></button>
          </div>
          <input class="edit" placeholder=${todo.contents} value="" />
        </li>
  `;
    })
    .join('');
  return result;
};

export const USERLIST = (username, userArray) => {
  const title = `
    <h1 id="user-title" data-username=${username}>
      <span><strong>${username}</strong>'s Todo List</span>
    </h1>
  `;
  const result = userArray
    .map((user) => {
      return `<button class="${
        user.name === username ? 'ripple active' : 'ripple'
      }">${user.name}</button>`;
    })
    .join('');
  return title.concat(result);
};

export const LOADING = `
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
  </li>`;
