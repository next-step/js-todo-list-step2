import TodoItem from "./TodoItem.js";

const TodoList = ({todoList}) => `
	<ul class="todo-list">
		${todoList.map(({_id, contents, isCompleted, priority}) => TodoItem({_id, contents, isCompleted, priority})).join('')}
	</ul>
`;

export default TodoList;
