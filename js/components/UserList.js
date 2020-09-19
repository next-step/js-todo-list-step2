import UserButton from "./UserButton.js";

const UserList = ({userList, selectedUserId}) => `
	<div>
		${userList.map(({_id, name}) => UserButton({_id, name, active: _id === selectedUserId})).join('')}
		<button class="ripple user-create-button" data-role="create">+ 유저 생성</button>
	</div>
`;

export default UserList;
