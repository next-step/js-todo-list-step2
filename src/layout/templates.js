'use strict';

const priorityTemplate = priority => {
  const priorityClassList = {
    FIRST: 'primary',
    SECOND: 'secondary',
    NONE: '',
  };

  return `
    <select class="chip select ${priorityClassList[priority]}" >
      <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
      <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
      <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
    </select>`;
};

export const todoTemplate = item => {
  return `
  <li data-id=${item.id} class="todo-item ${
    item.isCompleted ? 'completed' : ''
  }">
    <div class="view">
      <input class="toggle" type="checkbox" ${
        item.isCompleted ? 'checked' : ''
      }/>
      <label class="label">
        ${priorityTemplate(item.priority)}
        <span class="todo-item__contents">${item.contents}</span>
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${item.contents}" />
	</li>`;
};

export const progressTemplate = () => {
  return `
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
};
