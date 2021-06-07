import $api from './api/index.js'

const user =(() => {
  let selected = {};

  const init = async () => {
    const users = await user.getAll();
    users[0].active = true;
    selected = users[0]; 
  }

  const mapUser = (user) => {
    return {
      ...user,
      active: selected._id === user._id
    };
  };

  const getAll = async () => {
    const users = await $api.user.getAll().then(data => data.map(mapUser));
    return users;
  };

  const createUser = async (name) => {
    const newUser = await $api.user.create({name});
    return mapUser(newUser);
    
  }

  const deleteUser = async(userId) => {
    await $api.user.delete(userId);
    await init();
  }
  const setSelected = async (value) => {

    selected = value
  }

  const getSelected = async() => {
    return selected;
  }
  
  return {
    init,
    getAll,
    createUser,
    deleteUser,
    getSelected,
    setSelected,
  }
})();

const todo = (() => {
  let selectedUserId;

  const init = async () => {
    selectedUserId = user.getSelected()._id;
  };

  const getAll = () => {
    return await $api.todo.getAll(selectedUserId);
  };

  const create = async (contents) => {
    const todos = await $api.todo.create(selectedUserId, { contents });
    return todos;
  };

  const deleteTodo = async (todoId) => {
    const todos = await $api.todo.remove(selectedUserId, todoId);
    return todos;
  };

  const deleteAll = async () => {
    const todos = await $api.todo.remove(selectedUserId);
    return todos;
  };

  const toggle = async (todoId) => {
    const todos = await $api.todo.toggle(selectedUserId, todoId);
    return todos;
  };

  const edit = async (todoId, contents) => {
    const todos = await $api.todo.update(selectedUserId, todoId, {contents});
    return todos;
  };

  const setPriority = async (todoId, contents) => {
    const todos = await $api.todo.priority(selectedUserId, todoId, {contents})
    return todos;
  };

  return {
    init,
    getAll,
    create,
    deleteTodo,
    deleteAll,
    toggle,
    edit,
    setPriority
  }
})();

export default {user, todo}