import UserTitle from './template/User/UserTitle.js';
import UserListContainer from './template/User/UserListContainer.js';
import TodoContainer from './template/Todo/TodoContainer.js';
import UserList from './template/User/UserList.js';
import TodoList from './template/Todo/TodoList.js';

const $app = document.getElementById('app');

let components = {};

export const initRender = () => {
  components = {
    userTitle: UserTitle({}),
    userListContainer: UserListContainer('userList'),
    todoApp: TodoContainer({}),
  };

  $app.innerHTML = components.userTitle
    + components.userListContainer
    + components.todoApp;
};

export const userRender = () => {
  document.querySelector('#user-list').innerHTML = UserList({});
  document.querySelector('#user-title').innerHTML = UserTitle();
  document.querySelector('.todo-list').innerHTML = TodoList();
};

/*
* 문제: 이벤트 리스너가 포함된 돔을 바꿔버리면 이벤트 리스터를 다시 등록해 주어야 한다.
* 가상돔은 바껴야 할 돔만 바뀌기 때문에 이벤트 리스너에 대한 걱정이 덜 할 수 있다.
* 하지만 지금은 가상돔이 없기 때문에. 바껴야 할 부분을 예측해야 한다. 따라서 바뀌어야 할 부분과 바뀌면 안되는 부분을 분리시켜 주어야 한다 .
* 모든 것을 컴포넌트로 쓰고 싶지만. 어느정도의 타협이 필요할 것 같다.
* */


