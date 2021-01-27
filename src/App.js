export default function App() {
  const $userTitle = document.querySelector("#user-title");
  const $userList = document.querySelector("#user-list");

  const setUserTitle = (userName) => {
    $userTitle.innerHTML = `<span><strong>${userName}</strong>'s Todo List</span>`;
  };

  const handleSelectUser = ({ target }) => {
    if (!target.classList.contains("ripple")) {
      return;
    }

    const $previous = $userList.querySelector(".active");
    $previous.classList.remove("active");
    setUserTitle(target.innerText);
    target.classList.add("active");
  };

  $userList.addEventListener("click", handleSelectUser);
}
