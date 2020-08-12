import Model from './Model.js';
import fetchAPI from './api/index.js';

import { HeaderTitle, UserList, TodoList } from './components/index.js';
import { BASE_URL } from './constants/index.js';
import { $ } from './util/index.js';

const initState = {
	isLoading: false,
	selectedUser: {},
	byId: [],
	todo: [
		{
			text: '1',
			isCompleted: true,
		},
		{
			text: '2',
			isCompleted: false,
		},
	],
};

export default function App() {
	let model = Model({
		observable: initState,
		renderer: (prop) => {
			if (prop === 'selectedUser') {
				HeaderTitle({ $wrapper: $('#user-title strong'), selectedUser: model.selectedUser });
			}

			if (prop === 'users' || prop === 'selectedUser') {
				UserList({ $wrapper: $('#user-list'), users: model.users, selectedUser: model.selectedUser });
			}

			if (model.isLoading || prop === 'byId') {
				const todoData = model.byId[model.selectedUser._id];

				TodoList({ $wrapper: $('.todo-list'), isLoading: model.isLoading, ...todoData });
			}
		},
	});

	const useFetch = fetchAPI(model);

	const fetchUserList = () => {
		return useFetch(BASE_URL).then((res) => res);
	};

	const fetchTodoList = (userName) => {
		return useFetch(`${BASE_URL}/${userName}/item`).then((res) => res);
	};

	const fetchPostTodo = ({ content, userName }) => {
		return useFetch(`${BASE_URL}/${userName}/item`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				contents: content,
			}),
		});
	};

	const fetchDeleteTodo = ({ todoId, userName }) => {
		return useFetch(`${BASE_URL}/${userName}/item/${todoId}`, {
			method: 'DELETE',
		});
	};

	const getUserById = (userId) => {
		return model.users.find(({ _id }) => _id === userId);
	};

	const getUser = (user) => {
		return user ? model[user] : model.selectedUser;
	};

	const handleTodoList = async () => {
		const { name: userName } = getUser();

		const { _id, name, todoList = [] } = await fetchTodoList(userName);

		model.byId = {
			...model.byId,
			[_id]: {
				name: name,
				todoList: todoList,
				filter: 'ALL',
			},
		};
	};

	const handleSelectUser = async (userId) => {
		const selectedUser = userId ? getUserById(userId) : getUser();
		model.selectedUser = selectedUser;

		await handleTodoList();
	};

	const handleAddTodo = async (e) => {
		e.preventDefault();

		const isEnter = e.key === 'Enter';
		const { value: content } = e.target;

		if (!isEnter || !content) {
			return;
		}

		const response = await fetchPostTodo({
			content,
			userName,
		});

		if (response._id) {
			await handleTodoList();
			e.target.value = '';
		}
	};

	const handleDeleteTodo = async (todoId) => {
		const { name: userName } = getUser();

		const response = await fetchDeleteTodo({
			todoId,
			userName,
		});

		if (response) {
			await handleTodoList();
		}
	};

	return {
		init: async function () {
			const userList = await fetchUserList();
			const [initUser] = userList;

			model.users = userList;
			model.selectedUser = initUser;
			await handleTodoList(initUser.name);
		},
		bindEvent: function () {
			document.handleSelectUser = handleSelectUser;
			document.handleDeleteTodo = handleDeleteTodo;

			$('.todoapp > .input-container > .new-todo').addEventListener('keyup', handleAddTodo);
		},
	};
}
