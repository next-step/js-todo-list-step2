import $api from './api/index.js'
import watch from './watch.js';

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
  
  const subscribe = (method) => {
    watch.subscribe('user', method);
  }

  const publish = () => {
    watch.publish('user');
  }

  return {
    init,
    getAll,
    createUser,
    deleteUser,
    getSelected,
    setSelected,
    subscribe
  }



})();

export default user