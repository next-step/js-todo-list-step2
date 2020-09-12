const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

export const getUserList = async () => {
	try{
		const data = await fetch(BASE_URL);
		return await data.json();
	}catch (e) {
		console.error(e)
	}
}