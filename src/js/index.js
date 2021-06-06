const $userList = document.querySelector('#user-list');

const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

function getUserTemplate({ _id, name }) {
  return `<button class="ripple" id=${_id}>${name}</button>`;
}

const userControlButtonTemplate = `
  <button class="ripple user-create-button">
    + 유저 생성
  </button>
  <button class="ripple user-delete-button">
    삭제 -
  </button>
`;

function getUsers() {
  return new Promise((resolve) => {
    fetch(API_URL).then((response) => {
      resolve(response.json());
    });
  });
}

async function main() {
  const users = await getUsers();
  const usersTemplate = users.map(getUserTemplate);
  $userList.innerHTML = usersTemplate.join('') + userControlButtonTemplate;
}

main();
