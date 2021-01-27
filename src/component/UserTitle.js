export default function UserTitle() {
  const $userTitle = document.querySelector("#user-title");

  const render = (users) => {
    const { name } = users.find(({ active }) => active);

    $userTitle.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
  };

  return {
    render,
  };
}
