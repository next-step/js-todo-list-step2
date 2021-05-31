const BASEURL = "https://js-todo-list-9ca3a.df.r.appspot.com";

const userPath = {
	fetchUserList: "/api/users",
	addUser: "/api/users",
	fetchUserDelete(userId) {
		return `/api/users/${userId}`;
	},
	fetchUserTodos(userId) {
		return `/api/users/${userId}/items`;
	},
};

const todoPath = {
	fetchAddItem(userId) {
		return `/api/users/${userId}/items`;
	},
	fetchDeleteAll(userId) {
		return `/api/users/${userId}/items`;
	},
	fetchDeleteItem(userId, itemId) {
		return `/api/users/${userId}/items/${itemId}`;
	},
	fetchEditItem(userId, itemId) {
		return `/api/users/${userId}/items/${itemId}`;
	},
	fetchPriority(userId, itemId) {
		return `/api/users/${userId}/items/${itemId}/priority`;
	},
	fetchCompleteItem(userId, itemId) {
		return `/api/users/${userId}/items/${itemId}/toggle`;
	},
};

const options = {
	GET: { method: "GET" },
	POST(body) {
		return {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};
	},
	DELETE: { method: "DELETE" },
	PUT(body) {
		return {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : "",
		};
	},
};

const request = (endPoint, option) => {
	const data = fetch(BASEURL + endPoint, option).then((res) => res.json());
	return data;
};

const userAPI = {
	fetchUserList() {
		return request(userPath.fetchUserList, options.GET);
	},
	addUser(name) {
		return request(userPath.addUser, options.POST({ name }));
	},
	fetchUserDelete(userId) {
		return request(userPath.fetchUserDelete(userId), options.DELETE);
	},
	fetchUserTodos(userId) {
		return request(userPath.fetchUserTodos(userId), options.GET);
	},
};

const todoAPI = {
	fetchAddItem(userId, contents) {
		return request(
			todoPath.fetchAddItem(userId),
			options.POST({ contents })
		);
	},
	fetchDeleteAll(userId) {
		return request(todoPath.fetchDeleteAll(userId), options.DELETE);
	},
	fetchDeleteItem(userId, itemId) {
		return request(
			todoPath.fetchDeleteItem(userId, itemId),
			options.DELETE
		);
	},
	fetchEditItem(userId, itemId, contents) {
		return request(
			todoPath.fetchEditItem(userId, itemId),
			options.PUT({ contents })
		);
	},
	fetchPriority(userId, itemId, priority) {
		return request(
			todoPath.fetchPriority(userId, itemId),
			options.PUT({ priority })
		);
	},
	fetchCompleteItem(userId, itemId) {
		return request(
			todoPath.fetchCompleteItem(userId, itemId),
			options.PUT()
		);
	},
};

export { userAPI, todoAPI };
