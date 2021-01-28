import { API } from '../api/api.js';

export const getUser = (target) => {
  if (
    target.classList.contains('ripple') &&
    !target.classList.contains('user-create-button')
  ) {
    API.getUser(target.dataset.id).then((user) => {
      return user;
    });
    // user.then((user) => {
    //   renderTitle(user.name);
    //   renderTodos(user.todoList);

    //   addTodo(user);
    // });
  }
};
