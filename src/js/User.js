import UserTitle from './UserTitle.js';
import user from './store.js';
import UserListBtn from './UserSelect.js';
import UserList from './UserList.js';

export default function User() {
  let userData = {};
  let selectedUser = {};
  let userTitle = {};
  let userListBtn = {};
  let userList = {}; 

  const loadData = async () => {
    await user.init();
    userData = await user.getAll();
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
        user.setSelected(temp);
        await updateData();
        setState();
      },
      onAdd: async (name) => {
        const temp = await user.createUser(name);
        await user.setSelected(temp);
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

new User();