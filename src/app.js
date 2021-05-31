import TodoApp from "./component/TodoApp.js";
import request from "./util/request.js";
import ENV from "./constants/env.js";

const init = async () => {
	const { response: users, error } = await request(ENV.BASE_URL + ENV.USERS);
	if (error) {
		alert("사용자 목록을 가져오는데 실패했습니다");
		return;
	}
	new TodoApp(users);
};

document.addEventListener("DOMContentLoaded", init);
