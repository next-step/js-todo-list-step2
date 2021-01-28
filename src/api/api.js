const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const ADD_USER = '/api/users';

const addUser = (name) => {
  fetch(`${BASE_URL}${ADD_USER}`, {
    method: 'post',
    body: JSON.stringify({ name }),
  })
    .then((res) => res.json())
    .catch((err) => {
      // TODO: adduser api 호출 예외 처리
      console.log(err);
    });
};

export default {
  addUser,
};
