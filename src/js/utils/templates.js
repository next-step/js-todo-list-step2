const userActionButtons = `
  <button class="ripple user-create-button" data-action="createUser">
    + 유저 생성
  </button>
  <button class="ripple user-delete-button" data-action="deleteUser">
    삭제 -  
  </button>`;

export const priorityTemplate = {
  NONE: `
  <select class="chip select" data-action="selectPriority">
    <option value="NONE">순위</option>
    <option value="FIRST">1순위</option>
    <option value="SECOND">2순위</option>
  </select>
`,
  FIRST: `<span class="chip primary">1순위</span>`,
  SECOND: `<span class="chip secondary">2순위</span>`,
};

export const todoTemplate = (id, contents, isCompleted, priority) => `
 <li data-id=${id} data-contents=${contents} data-priority=${priority} class=${
  isCompleted ? 'completed' : ''
}>
     <div class="view">
         <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
         <label class="label">
         ${priorityTemplate[priority]}
         ${contents}
         </label>
         <button class="destroy"></button>
     </div>
     <input class="edit"/>
 </li>`;

export const todoListTemplate = (datas) => {
  let result = '';
  datas &&
    datas.map((todo) => {
      result += todoTemplate(
        todo._id,
        todo.contents,
        todo.isCompleted,
        todo.priority,
      );
    });
  return result;
};

export const todoCounterTemplate = (counter) =>
  `총 <strong>${counter}</strong> 개</span>`;

export const userListTemplate = (userList, activeUserId) => {
  let result = '';
  userList &&
    userList.map((user) => {
      if (user._id === activeUserId) {
        result += `<button class="ripple active" data-id=${user._id} data-name=${user.name}>${user.name}</button>`;
      } else {
        result += `<button class="ripple" data-id=${user._id} data-name=${user.name}>${user.name}</button>`;
      }
    });
  return result + userActionButtons;
};

export const userTitleTemplate = (userName) =>
  `<p class="title"><strong>${userName}</strong>'s Todo List</p>`;

export const loaderTemplate = `
  <label class="label">
    <div class="animated-background">
      <div class="skel-mask-container">
        <div class="skel-mask"></div>
      </div>
    </div>
  </label>`;
