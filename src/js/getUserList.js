const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
const method = "/api/users";

async function getUserList() {
    const requestUrl = baseUrl + method;
    const response = await fetch(requestUrl);
    const data = await response.json()
    console.log(data)
    return data;
  }

export { getUserList };