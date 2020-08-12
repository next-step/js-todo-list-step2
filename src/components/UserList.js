export default function TodoList({ $wrapper, users, selectedUser }) {
	const activeClass = (id) => (id === selectedUser._id ? 'active' : '');

	$wrapper.innerHTML = users.reduce(
		(html, { _id, name }) =>
			html + `<button class="ripple ${activeClass(_id)}" onClick="handleSelectUser('${_id}')">${name}</button>`,
		'',
	);
}
