import UserList from "./components/UserList.js";
import UserTitle from "./components/UserTitle.js";
import TodoApp from "./components/TodoApp.js";
import { SELECTOR } from "./utils/constants.js";

export default function App($app) {
  this.state = {
    username: "",
    loading: true,
  };

  this.setState = ({ username, loading }) => {
    if (username) {
      this.state.username = username;
    }

    if (typeof loading === "boolean") {
      this.state.loading = loading;
    }

    this.render();
  };

  this.toggleLoading = () => {
    const pageLoading = document.querySelector(`.${SELECTOR.PAGE_LOADING}`);
    pageLoading.classList.toggle(SELECTOR.DISPLAY_NONE, !this.state.loading);
  };

  const userTitle = new UserTitle(
    document.querySelector(`#${SELECTOR.USER_TITLE}`)
  );

  const userList = new UserList(
    document.querySelector(`#${SELECTOR.USER_LIST}`),
    {
      setUsername: (username) => {
        this.setState({ username, loading: false });
        todoApp.setUsername(username);
        // loadTodosByUsername 이후 todoApp의 render 실행
        todoApp.loadTodosByUsername();
        this.toggleLoading();
      },
    }
  );

  const todoApp = new TodoApp($app.querySelector(`.${SELECTOR.TODO_APP}`));

  this.render = () => {
    if (this.state.loading) {
      return;
    }

    userTitle.render(this.state.username);
    userList.render();
  };
}
