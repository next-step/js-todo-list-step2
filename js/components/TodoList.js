import TodoItem from "./TodoItem.js";

const TodoList = ({todoList}) => `
	<ul class="todo-list">
		${todoList.map(({_id, contents, isCompleted, priority, edit}) => TodoItem({_id, contents, isCompleted, priority, edit})).join('')}
	</ul>
`;

export default TodoList;
