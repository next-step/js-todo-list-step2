export default function UserTitle($userTitle) {
  this.render = (username) => {
    $userTitle.innerHTML = `<span><strong>${username}</strong>'s Todo List</span>`;
  };
}
