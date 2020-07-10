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

	const getUserById = (userId) => {
		return model.users.find(({ _id }) => _id === userId);
	};

	const handleTodoList = async (userName) => {
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
		const selectedUser = userId ? getUserById(userId) : model.selectedUser;
		model.selectedUser = selectedUser;

		await handleTodoList(selectedUser.name);
	};

	const handleAddTodo = async (e) => {
		e.preventDefault();

		const isEnter = e.key === 'Enter';
		const { value: content } = e.target;

		if (!isEnter || !content) {
			return;
		}

		const userName = model.selectedUser.name;

		const response = await fetchPostTodo({
			content,
			userName,
		});

		if (response._id) {
			await handleTodoList(userName);
			e.target.value = '';
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

			$('.todoapp > .input-container > .new-todo').addEventListener('keyup', handleAddTodo);
		},
	};
}
