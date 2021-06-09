import User from "../components/user/User.js";
import UserList from '../components/user/UserList.js';
import TodoList from '../components/todo/TodoList.js';
import TodoInput from '../components/todo/TodoInput.js';
import TodoFooter from '../components/todo/TodoFooter.js';

import { $ } from "../utils/element.js";
import api from '../api/index.js';
import usersStore from '../store/user.js';

import { CLASS_NAME } from "../const/USER.js";
import { CLASS_NAME as TODO_CLASS_NAME } from '../const/TODO.js';

class UserApp {
  constructor(User, UserList, TodoList) {
    this.$userListContainer = $(CLASS_NAME.USER_LIST_CONTAINER);
    this.$todoList = $(TODO_CLASS_NAME.TODO_LIST);

    this.User = User(this.$userListContainer);
    this.UserList = UserList(this.$userListContainer);
    this.usersStore = usersStore();

    this.TodoList = TodoList(this.$todoList);

    this.TodoFooter = TodoFooter();

    this.init();
    
  }

  init() {
    this.setEvent();
    this.updateUserList({
      updatedType: 'user'
    });
  }

  async updateUserList({ updatedSelectedUserId, updatedType }) {
    if (updatedType === 'user') {
      this.usersStore.users = await api.getUsers();
    }

    this.usersStore.selectedUserId = updatedSelectedUserId;
    
    this.UserList.setState(this.usersStore.selectedUserId, this.usersStore.users);
    this.updateTodoList();
  }

  reset() {
    history.replaceState(null, null, ' ')
    this.usersStore.selectedFilterType = '';
  }

  async updateTodoList(filterTodoList) {
    if (!filterTodoList) {

      this.reset();

      const query = {
        userId: this.usersStore.selectedUserId
      };
      
      const todos = await api.getTodosByUserId(query);
      
      this.usersStore.todos = todos;
      filterTodoList = this.usersStore.todos;
    }

    this.TodoList.setState(filterTodoList);
    this.TodoFooter.setState(filterTodoList.length);
  }

  setEvent() {
    this.setUserEvent();
    this.setUserListEvent();
    this.setTodoInputEvent();
    this.setTodoListEvent();
    this.setTodoFooterEvent();
  }

  setUserEvent() {
    this.User.setEvent({
      add: async name => {
        const data = await api.postUser({
          name,
        });
        this.updateUserList({ updatedSelectedUserId: data._id, updatedType: 'user' });
      },
      delete: async () => {
        const data = await api.deleteUserByUserId({ 
          userId: this.usersStore.selectedUserId,
        });
        alert(data.message);
        this.updateUserList({ updatedType: 'user' });
      }
    });
  }

  setUserListEvent() {
    this.UserList.setEvent({
      select: updatedSelectedUserId => {
        this.updateUserList({
          updatedSelectedUserId
        });
      }
    })
  }

  setTodoInputEvent() {
    TodoInput({
      add: async contents => {
        const query = {
          userId: this.usersStore.selectedUserId,
          contents,
        }
        await api.postTodoByUserId(query);
        this.updateTodoList();
      }
    })
  }

  setTodoFooterEvent() {
    this.TodoFooter.setEvent({
      deleteAll: async() => {
        const query = {
          userId: this.usersStore.selectedUserId,
        };
        
        await api.deleteTodosByUserId(query);
        this.updateTodoList();
        
      },
      filter: filterBy => {
        this.usersStore.selectedFilterType = filterBy;

        this.updateTodoList(this.usersStore.filteredTodoList);
      }
    })
  }

  async updateTodoState(api, { itemId, key, value }) {
    const todoItem = this.usersStore.getTodoItem(itemId);
    const query = {
      ...todoItem,
      userId: this.usersStore.selectedUserId,
      itemId,
      [key]: value,
    };
    
    await api(query);
    this.updateTodoList();
  }

  setTodoListEvent() {
    this.TodoList.setEvent({
      updatePriority: async (itemId, priority) => {
        this.updateTodoState(
          api.putTodoPriorityByUserIdAndItemId,
          {
            itemId,
            key: 'priority',
            value: priority,
          }
        )
      },
      updateContents: async (itemId, contents) => {
        this.updateTodoState(
          api.putTodoByUserIdAndItemId,
          {
            itemId,
            key: 'contents',
            value: contents,
          }  
        )
      },
      updateCompleted: async (itemId, isCompleted) => {
        this.updateTodoState(
          api.putTodoCompleteByUserIdAndItemId,
          {
            itemId,
            key: 'isCompleted',
            value: isCompleted,
          }
        )
      },
      deleteItem: async (itemId) => {
        this.updateTodoState(
          api.deleteTodoByUserIdAndItemId,
          {
            itemId
          }
        )
      }
    })
  }
}

export default function() {
  new UserApp(User, UserList, TodoList)
}