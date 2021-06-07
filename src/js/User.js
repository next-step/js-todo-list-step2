import UserTitle from './UserTitle.js';
import UserSelect from './UserSelect.js';
import user from './store.js';
import watch from './watch.js';
import UserListBtn from './UserSelect.js';
import UserList from './UserList.js';
/*
new UserTitle('#user-title');
new UserSelect('#user-list');
watch.publish("user");
*/

function UserTodo() {
  let userData = {};
  let selectedUser = {};
  let userTitle = {};
  let userListBtn = {};
  let userList = {}; 

  const loadData = async () => {
    await user.init();
    userData = await user.getAll();
    console.log(userData);
    selectedUser = await user.getSelected();
  }
  const updateData = async () => {
    userData = await user.getAll();
    selectedUser = await user.getSelected();
  }

  const drawComponent = async () => {
    userTitle = await new UserTitle();
    userListBtn = await new UserListBtn();
    userList = await new UserList({
      onSelect: async (id) => {
        const temp = userData.find(user => user._id === id);
        console.log(temp);
        user.setSelected(temp);
        await updateData();
        setState();
      },
      onAdd: async (name) => {
        const temp = await user.createUser(name);
        await user.setSelected(temp);
        console.log(temp);
        await updateData();
        setState();
      },
      onDelete: () => {
        const selectedId = selectedUser._id
        user.deleteUser(selectedId);
        init();
  
      }
    });
  }
  
  const setState = async () => {
    await userTitle.setState(selectedUser.name);
    await userListBtn.setState(userData);
    await userList.setState(userData);
  }

  const init = async () => {
    await loadData();
    await drawComponent();
    await setState();
  }
  
  init();
  
}

new UserTodo();