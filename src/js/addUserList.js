const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
const method = "/api/users";

async function addUserList(userName) {
    const requestUrl = baseUrl + method;
    fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
        }),
      }).then((response) => console.log(response))
  }

export { addUserList };