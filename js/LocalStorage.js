const defaultUserList = [
  {
    _id: "default",
    name: "default_user",
  },
];

export const getUserListByLocalStorage = () => {
  const userList = localStorage.getItem("userlist");
  return userList ? userList : defaultUserList
};

export const setUserListToLocalStorage = () => {
  localStorage.removeItem("userlist");
  const userList = document.querySelector(".todo-list>li");
  const dataset = userList.reduce((acc, curr) => {
    const form = {
      id: "",
      name: "",
    };
    form.id = curr.getAttribute("id");
    form.name = curr.innerText;
    acc.push(form);
    return acc;
  }, []);
  localStorage.setItem("userlist", dataset);
};
