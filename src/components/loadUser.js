const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

const loadUserApi = async () => {
  try {
    const respnsoe = await fetch(`${BASE_URL}/users`);
    if (respnsoe.ok) {
      return await respnsoe.json();
    }
    throw new Error(response.status);
  } catch (err) {
    alert(`Error : ${err}`);
  }
};

const userTemplate = ({ name, todoList }) => {
  return `<button class="ripple">${name}</button>`;
};

export const loadUser = () => {
  const $userList = document.querySelector('#user-list');
  const users = loadUserApi();

  users.then((users) => {
    users.map((user) => {
      $userList.insertAdjacentHTML('afterbegin', userTemplate(user));
    });
  });
};
