export default function HeaderTitle({ $wrapper, selectedUser }) {
	$wrapper.innerHTML = selectedUser.name;
}
