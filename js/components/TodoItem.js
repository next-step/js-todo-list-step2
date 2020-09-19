const TodoItem = ({_id, contents, isCompleted, priority, edit}) => `
	<li class="${isCompleted?'completed ':''} ${edit?'editing':''}">
		<div class="view">
            <input data-id="${_id}" data-role="complete" class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
            <label class="label" data-id="${_id}">
              <span class="chip primary">${priority}순위</span>
              ${contents}
            </label>
            <button class="destroy" data-id="${_id}" data-role="delete"></button>
	 	</div>
	 	<input class="edit" value="${contents}" data-id="${_id}"/>
	</li>
`;

export default TodoItem;