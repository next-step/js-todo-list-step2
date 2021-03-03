'use strict';

export const loadingItem = () => {
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
	</li>
	`;
};

export const todoItemTemplate = (text, id, completed) => {
  return `
	<li data-id="${id}" class="todo-item ${completed ? 'completed' : ''}">
		<div class="view">
		<input class="toggle" type="checkbox" ${completed ? 'checked' : ''}/>
		<label class="label">
			<select class="chip select">
			<option value="0" selected>순위</option>
			<option value="1">1순위</option>
			<option value="2">2순위</option>
			</select>
			${text}
		</label>
		<button class="destroy"></button>
		</div>
		<input class="edit" value="${text}" />
	</li>
	`;
};
