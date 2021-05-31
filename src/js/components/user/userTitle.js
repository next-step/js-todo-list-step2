export default function UserTitle() {
  const userTitle = document.querySelector("#user-title");

  this.render = (name) => {
    userTitle.setAttribute("data-username", name);
    userTitle.querySelector("strong").textContent = name;
  };
}
