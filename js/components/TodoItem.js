import {PRIORITY} from '../constant.js';

const TodoItem = ({_id, contents, isCompleted, priority, edit}) => `
	<li class="${isCompleted?'completed ':''} ${edit?'editing':''}">
		<div class="view">
            <input data-id="${_id}" data-role="complete" class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
            <label class="label" data-id="${_id}">
                <select class="chip select ${PRIORITY[priority]}" data-role="priority"  data-id="${_id}">
                    <option value="NONE" ${priority==='NONE'?'selected':''}>순위</option>
                    <option value="FIRST" ${priority==='FIRST'?'selected':''}>1순위</option>
                    <option value="SECOND" ${priority==='SECOND'?'selected':''}>2순위</option>
              </select>
              ${contents}
            </label>
            <button class="destroy" data-id="${_id}" data-role="delete"></button>
	 	</div>
	 	<input class="edit" value="${contents}" data-id="${_id}" data-role="edit"/>
	</li>
`;

export default TodoItem;