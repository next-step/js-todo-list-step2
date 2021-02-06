export const getUserListByLocalStorage = () => {
  const userList = JSON.parse(localStorage.getItem("userlist"));
  if (!userList) return false;
  return userList;
};

export const setUserListToLocalStorage = () => {
  localStorage.removeItem("userlist");
  const userList = [...document.querySelectorAll("#user-list>.userBtn")];
  const dataset = userList.reduce((acc, curr) => {
    const form = {
      _id: curr.getAttribute("id"),
      name: curr.innerText,
    };
    acc.push(form);
    return acc;
  }, []);
  localStorage.setItem("userlist", JSON.stringify(dataset));
};
