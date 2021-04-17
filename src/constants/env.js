const ENV = {
	BASE_URL: "https://js-todo-list-9ca3a.df.r.appspot.com/",
	USERS: "/api/users",
	USER: (userId) => `/api/users/${userId}`,
	ITEM: (userId) => `/api/users/${userId}/items/`,
	USER_ITEM: (userId, itemId) => `/api/users/${userId}/items/${itemId}`,
	ITEM_PRIORITY: (userId, itemId) => `/api/users/${userId}/items/${itemId}/priority`,
	ITEM_TOGGLE: (userId, itemId) => `/api/users/${userId}/items/${itemId}/toggle`
};

export default ENV;
