import template from "../util/template.js";

function UserList({ onSelectingUser, target, onAddUser, onDeleteUser }) {
	target.addEventListener("click", onSelectingUser);

	this.setState = (updatedUsers, selectedUserIdx) => {
		render(updatedUsers, selectedUserIdx);
	};

	const html = (userList, selectedUserIdx) => {
		return userList.map((user, idx) => {
			let button;
			if (idx === selectedUserIdx) {
				button = template("button", { class: "ripple active", dataId: user.id });
			} else {
				button = template("button", { class: "ripple" });
			}

			button.append(document.createTextNode(user.name));
			return button;
		});
	};

	this.render = (updatedUsers, selectedUserIdx) => {
		target.innerHTML = "";

		const usersDOM = html(updatedUsers, selectedUserIdx);
		const addButton = template("button", {
			class: "ripple user-create-button",
			dataAction: "createUser",
			onClick: onAddUser
		});
		const deleteButton = template("button", {
			class: "ripple user-delete-button",
			dataAction: "deleteUser",
			onClick: onDeleteUser
		});

		addButton.append(document.createTextNode("+ 유저 생성"));
		deleteButton.append(document.createTextNode("삭제 -"));

		target.append(...usersDOM, addButton, deleteButton);
	};
}

export default UserList;
