import UserTitle from './UserTitle.js';
import user from './store/user.js';
import UserListBtn from './UserSelect.js';
import UserList from './UserList.js';

export default function UserContainer({onUpdateUser}) {
  this.userData = {};
  this.selectedUser = {};
  this.userTitle = {};
  this.userListBtn = {};
  this.userList = {}; 

  const loadData = async () => {
    this.userData = await user.init();
    this.selectedUser = await user.getSelected();
  }
  const updateData = async () => {
    this.userData = await user.getAll();
    this.selectedUser = await user.getSelected();
  }

  const drawComponent = async () => {
    this.userTitle = await new UserTitle();
    this.userListBtn = await new UserListBtn();
    this.userList = await new UserList({
      onSelect: async (id) => {
        const temp = this.userData.find(user => user._id === id);
        await user.setSelected(temp);
        await updateData();
        await this.setState();
        onUpdateUser();
      },
      onAdd: async (name) => {
        const temp = await user.createUser(name);
        await user.setSelected(temp);
        await updateData();
        this.setState();
      },
      onDelete: () => {
        const selectedId = this.selectedUser._id
        user.deleteUser(selectedId);
        this.init();
      }
    });
  }
  
  this.setState = async () => {
    await this.userTitle.setState(this.selectedUser.name);
    await this.userListBtn.setState(this.userData);
    await this.userList.setState(this.userData);
  }

  this.init = async () => {
    await loadData();
    await drawComponent();
    await this.setState();
  }
}

