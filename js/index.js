const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const requestBody = JSON.stringify({
    name: userName,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };
  fetch("https://js-todo-list-9ca3a.df.r.appspot.com/api/users", options).then(
    (res) => {
      if (!res.ok) return new Error(res.status);
      const userBtn = document.createElement("button");
      userBtn.classList.add("ripple");

      const userList = document.getElementById("user-list");
      userList.appendChild(userBtn);
    }
  );
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);
