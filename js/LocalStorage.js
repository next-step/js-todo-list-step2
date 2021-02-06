const defaultUserList = [
  {
    _id: "default",
    name: "default_user",
  },
];

export const getUserListByLocalStorage = () => {
  const userList = JSON.parse(localStorage.getItem("userlist"));
  console.log(userList);
  return userList.length !== 0 ? userList : defaultUserList;
};

export const setUserListToLocalStorage = () => {
  console.log("set!");
  localStorage.removeItem("userlist");
  const userList = [...document.querySelectorAll("#user-list>.userBtn")];
  const dataset = userList.reduce((acc, curr) => {
    const form = {
      id: curr.getAttribute("id"),
      name: curr.innerText,
    };
    acc.push(form);
    return acc;
  }, []);
  localStorage.setItem("userlist", JSON.stringify(dataset));
};
