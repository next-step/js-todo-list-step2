'use strict';

const priorityTemplate = priority => {
  const priorityClassList = {
    FIRST: 'primary',
    SECOND: 'secondary',
    NONE: '',
  };

  return `<select class="chip select ${priorityClassList[priority]}" >
			  <option value="0" ${priority === 'NONE' && 'selected'}>순위</option>
			  <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
			  <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
			</select>`;
};

const todoTemplate = todo => {
  return `
  <li data-id=${todo._id} class="todo-item ${
    todo.isCompleted ? 'completed' : ''
  }">
	<div class="view">
		<input class="toggle" type="checkbox" ${todo.isCompleted ? 'checked' : ''}/>
		<label class="label">
		${priorityTemplate(todo.priority)}
		${todo.contents}
		</label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="${todo.contents}" />
	</li>`;
};

export const progressTemplate = () => {
  return `<li>
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
