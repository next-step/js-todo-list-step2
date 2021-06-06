import { $ } from "../utils/querySelector.js";
import { getFetch } from "../api/api.js";

export default function UserList () {
	const $userList = $("#user-list");


	this.setState = (users) => {
		console.log("users", users);

		addUser(users);
	}

	const addUser = (users) => {
		let items = "";

		users.map(({name}, id) => {
			items += `<button class="ripple ${ id === 0 && "active" }">${ name }</button>`;
		})

		items += `
			<button class="ripple user-create-button" data-action="createUser">
				+ 유저 생성
			</button>
			<button class="ripple user-delete-button" data-action="deleteUser">
				삭제 -
			</button>`;

		$("#user-list").innerHTML = items;

		$('.user-create-button').addEventListener('click', onUserCreateHandler);
		$('.user-delete-button').addEventListener('click', onUserDeleteHandler);
	}

	const onUserCreateHandler = () => {
		const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
	}

	const onUserDeleteHandler = () => {
		alert("유저 삭제 로직 추가");
	}
}