import { $, $$ } from "../utils/querySelector.js";
import API from "../api/api.js";

export default function UserList () {

	this.setState = (users) => {
		addUser(users);
	}

	const addUser = (users) => {
		let items = "";

		users.map(({ _id, name }, id) => {
			items += `<button class="user ripple ${ id === 0 && "active" }" data-id="${ _id }">${ name }</button>`;
		})

		items += `
			<button class="ripple user-create-button" data-action="createUser">
				+ 유저 생성
			</button>
			<button class="ripple user-delete-button" data-action="deleteUser">
				삭제 -
			</button>`;

		$("#user-list").innerHTML = items;

		$$('.user').forEach(item => item.addEventListener('click', onUserClickHandler));

		$('.user-create-button').addEventListener('click', onUserCreateHandler);
		$('.user-delete-button').addEventListener('click', onUserDeleteHandler);
	}

	const onUserClickHandler = ({ currentTarget }) => {
		$(".active").classList.remove("active");
		currentTarget.classList.add("active");
	}

	const onUserCreateHandler = () => {
		const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
	}

	const onUserDeleteHandler = async () => {
		const activeUserId = $(".active").dataset.id;

		await API.deleteFetch(`/api/users/${ activeUserId }`);

		this.setState(await API.getFetch("/api/users"));
	}
}