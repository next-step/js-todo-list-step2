/*@jsx Reilly.createElement*/
import Reilly, { createElement } from './lib/reilly/Reilly.js';
import Main from './components/Main.js';
import Title from './components/atom/Title.js';
import TodoForm from './components/atom/TodoForm.js';
import { Todo, AppState, User } from './types/index.js';
import TodoService from './services/TodoService.js';
import UserService from './services/UserService.js';
import { UserList } from './components/module/UserList.js';
import { FILTER_STATUS, PRIORITY_ENUM } from './types/constants.js';

const initialState = {
  isUsersLoading: false,
  todoList: null,
  user: null,
  users: [],
  editingId: null,
  mode: FILTER_STATUS.ALL,
  error: null,
};

class App extends Reilly.Component {
  _state = new AppState(initialState);

  constructor(props) {
    super(props);
    this.fetchUserList();
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.addTodo = this.addTodo.call(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.deleteAllTodos = this.deleteAllTodos.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.startEditTodo = this.startEditTodo.bind(this);
    this.confirmEditTodo = this.confirmEditTodo.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.setPriority = this.setPriority.bind(this);
  }

  async fetchUserList() {
    this.setState({ isUsersLoading: true });

    try {
      if (this._state.users.length) return;
      const users = await UserService.fetchUsers();

      this.setState({ isUsersLoading: false, users });
    } catch (error) {
      this.setState({ isUsersLoading: false, error });
      console.warn(error);
    }
  }

  async selectUser(e) {
    this.setState({ isUserLoading: true });
    const targetId = e.target.id;

    try {
      const user = await UserService.fetchUser(targetId);
      this.setState({ user, todoList: user.todoList, isUserLoading: false });
    } catch (error) {
      this.setState({ error, isUserLoading: false });
    }
  }

  async createUser() {
    let name;
    while (!name || name.length < 2)
      name = prompt('please insert name', 'domuk')?.trim();

    try {
      const { data: user } = await UserService.add(new User({ name }));
      this.setState({
        user,
        todoList: user.todoList,
        users: [user, ...this._state.users],
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  async deleteUser(e) {
    e.preventDefault();

    const targetId = this._state.user._id;
    const response = confirm(`destory this user: "${this._state.user.name}"?`);
    if (!response) return;

    try {
      await UserService.delete(targetId);
      this.setState({
        user: null,
        todoList: null,
        users: this._state.users?.filter(({ _id }) => _id !== targetId),
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  addTodo() {
    let isSubmitting = false;

    return async e => {
      e.preventDefault();
      if (isSubmitting) return;
      isSubmitting = true;

      const content = e.target.elements['new-todo'].value.trim();
      if (!content) return;

      try {
        const { data } = await TodoService.add(
          this._state.user._id,
          new Todo(content)
        );

        this.setState({ todoList: [data, ...this._state.todoList] });
      } catch (error) {
        this.setState({ error });
      }
      isSubmitting = false;
    };
  }

  toggleTodo(e) {
    e.stopPropagation();
    if (!e.target.matches('.toggle')) return;

    const targetId = e.path.find(elm => elm.matches('li')).id;
    const todoList = this._state.todoList.map(toggledBy(targetId));

    try {
      this.setState({ todoList });
      TodoService.toggleOne(this._state.user._id, targetId);
    } catch (error) {
      this.setState({ error });
    }
  }

  removeTodo(e) {
    if (!e.target.matches('.destroy')) return;
    if (!confirm('destroy this for real?')) return;

    const targetId = e.target.closest('li').id;
    const todoList = this._state.todoList.filter(todo => todo._id !== targetId);

    try {
      this.setState({ todoList });
      TodoService.deleteOne(this._state.user._id, targetId);
    } catch (error) {
      this.setState({ error });
    }
  }

  async deleteAllTodos(e) {
    if (!this._state.todoList.length) {
      alert('No todos to delete!');
      return;
    }
    const answer = confirm('😈 Wanna delete every todos?');
    if (!answer) return;

    await TodoService.deleteAll(this._state.user._id);
    this.setState({ todoList: [] });
  }

  async setPriority(e) {
    e.stopPropagation();
    e.preventDefault();

    const targetId = e.target.closest('li').id;
    const targetPriority = e.target.selectedIndex; // select node

    const { data: newTodo } = await TodoService.setPriority(
      this._state.user._id,
      targetId,
      {
        priority: PRIORITY_ENUM.get(targetPriority),
      }
    );

    const todoList = this._state.todoList.map(todo =>
      todo._id !== targetId ? todo : newTodo
    );

    this.setState({ todoList });
  }

  changeMode(e) {
    e.preventDefault();
    this.setState({
      mode: e.target.classList[0],
    });
  }

  startEditTodo(e) {
    if (!e.target.matches('label')) return;
    const editingId = e.target.closest('li').id;
    this.setState({ editingId });
  }

  confirmEditTodo(e) {
    e.stopPropagation();
    if (!(e.key === 'Enter' || e.key === 'Escape')) return;

    if (e.key === 'Escape') {
      this.setState({
        editingId: null,
      });
      return;
    }

    const targetId = e.target.closest('li').id;
    const contents = e.target.value;

    if (!contents) {
      this.setState({
        editingId: null,
      });
      return;
    }

    const todoList = this._state.todoList.map(confirmedBy(targetId, contents));

    try {
      this.setState({
        todoList,
        editingId: null,
      });
      TodoService.updateOne(this._state.user._id, targetId, {
        contents,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  componentDidUpdate() {
    const targetId = this._state.editingId;

    if (targetId) {
      window.onbeforeunload = () => '작성 중인 메시지가 있습니다.';
      document.getElementById(targetId).querySelector('.edit')?.focus();
    } else {
      window.onbeforeunload = null;
      document.querySelector('input')?.focus();
    }
  }

  render() {
    const {
      isUsersLoading,
      user,
      todoList,
      users,
      mode,
      error,
      editingId,
    } = this._state;

    console.log('RENDERED!');

    if (error) return <h1> {JSON.stringify(error)} Error occured!</h1>;

    return (
      <div id="app">
        <Title id="user-title" user={user} />,
        <UserList
          users={users}
          isUsersLoading={isUsersLoading}
          isUserLoaded={!!user}
          onSelectUser={this.selectUser}
          onCreateUser={this.createUser}
          onDeleteUser={this.deleteUser}
        />
        <div className="todoapp">
          {user && <TodoForm onsubmit={this.addTodo} />}
          {user && (
            <Main
              todoList={todoList}
              mode={mode}
              editingId={editingId}
              onToggle={this.toggleTodo}
              onRemove={this.removeTodo}
              onDeleteAll={this.deleteAllTodos}
              onSetPriority={this.setPriority}
              onModeChange={this.changeMode}
              onStartEdit={this.startEditTodo}
              onConfirmEdit={this.confirmEditTodo}
            />
          )}
        </div>
      </div>
    );
  }
}

const toggledBy = targetId => todo => {
  const newTodo = {
    ...todo,
    isCompleted: !todo.isCompleted,
    _updatedAt: new Date().toISOString(),
  };

  return todo._id !== targetId ? todo : newTodo;
};

const confirmedBy = (targetId, contents) => todo => {
  const newTodo = { ...todo, contents, _updatedAt: new Date().toISOString() };

  return todo._id !== targetId ? todo : newTodo;
};

export default App;
