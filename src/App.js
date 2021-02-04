/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { Title, TodoForm, UserList, Main } from 'components';
import { Todo, AppState, User } from './types';
import { TodoService, UserService } from './services';
import { FILTER_STATUS, PRIORITY_ENUM } from 'utility';
import { Interactions, keyCode } from 'utility';

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
    this.deleteTodo = this.deleteTodo.bind(this);
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
      const users = await UserService.fetchUsers();
      this.setState({ isUsersLoading: false, users });
    } catch (error) {
      this.setState({ isUsersLoading: false, error });
    }
  }

  async selectUser(e) {
    this.setState({ isUserLoading: true });
    const { id } = e.target;

    try {
      const user = await UserService.fetchUser(id);
      this.setState({ user, todoList: user.todoList, isUserLoading: false });
    } catch (error) {
      this.setState({ error, isUserLoading: false });
    }
  }

  async createUser() {
    const name = Interactions.askName();
    if (!name) return;

    try {
      const user = await UserService.add(new User({ name }));
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

    const targetId = this._state.user?._id;
    if (!targetId) {
      Interactions.noUserToDelete();
      return;
    }
    if (!Interactions.confirmDelete(this._state.user.name)) return;

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

      if (!content) {
        isSubmitting = false;
        return;
      }

      if (content.length < 2) {
        Interactions.warnTodo(content);
        isSubmitting = false;
        return;
      }

      try {
        const addedTodo = await TodoService.add(
          this._state.user._id,
          new Todo(content)
        );
        this.setState({ todoList: [addedTodo, ...this._state.todoList] });
      } catch (error) {
        this.setState({ error });
      }

      isSubmitting = false;
    };
  }

  toggleTodo(e) {
    e.stopPropagation();
    if (!e.target.matches('.toggle')) return;

    const targetId = e.target.closest('li').id;
    const todoList = this._state.todoList.map(toggledBy(targetId));

    try {
      this.setState({ todoList });
      TodoService.toggleOne(this._state.user._id, targetId);
    } catch (error) {
      this.setState({ error });
    }
  }

  deleteTodo(e) {
    if (!e.target.matches('.destroy')) return;
    if (!Interactions.confirmDelete()) return;

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
      Interactions.noTodos();
      return;
    }
    const answer = Interactions.confirmDeleteAll();
    if (!answer) return;

    await TodoService.deleteAll(this._state.user._id);
    this.setState({ todoList: [] });
  }

  async setPriority(e) {
    e.stopPropagation();
    e.preventDefault();

    const targetId = e.target.closest('li').id;
    const targetPriority = e.target.selectedIndex; // select node

    const newTodo = await TodoService.setPriority(
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
    if (!(keyCode.isEnter(e) || keyCode.isEscape(e))) return;

    if (keyCode.isEscape(e)) {
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

    if (error) {
      return (
        <div>
          <h1> {error.message} Error occured!</h1>
          <h2>
            <a href="/">plz reload</a>
          </h2>
        </div>
      );
    }

    return (
      <div id="app">
        <Title id="user-title" user={user} />
        <UserList
          users={users}
          isUsersLoading={isUsersLoading}
          isUserLoaded={!!user}
          onSelectUser={this.selectUser}
          onCreateUser={this.createUser}
          onDeleteUser={this.deleteUser}
        />
        <div className="todoapp">
          {user && (
            <Main
              todoList={todoList}
              mode={mode}
              editingId={editingId}
              onAdd={this.addTodo}
              onToggle={this.toggleTodo}
              onDelete={this.deleteTodo}
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
