import {Component} from "../core/Component.js";
import {UserTitle} from "../components/User/UserTitle.js";
import {UserList} from "../components/User/UserList.js";
import {ADD_USER, REMOVE_USER, SET_USER, userStore} from "../store/userStore.js";
import {FETCH_ITEMS, SET_LOADING_TYPE, todoStore} from "../store/todoStore.js";
import LoadingTypes from "../constants/LoadingTypes.js";
import {lazyFrame} from "../utils/index.js";

export const UserContainer = class extends Component {

  get userId () { return userStore.$getters.selectedUser._id }

  loadItemsByUser = async index => {
    todoStore.commit(SET_LOADING_TYPE, LoadingTypes.INIT);
    userStore.commit(SET_USER, index);
    const userId = this.userId;
    await Promise.all([
      todoStore.dispatch(FETCH_ITEMS, userId),
      lazyFrame(),
    ]);
    todoStore.commit(SET_LOADING_TYPE, LoadingTypes.LOADED);
    history.pushState({ user_id: userId }, null, `./?user_id=${userId}`);
  }

  appendUser = userName => userStore.dispatch(ADD_USER, userName);

  removeUser = () => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;
    userStore.dispatch(REMOVE_USER, this.userId);
  }


  $children = () => ({
    UserTitle: {
      constructor: UserTitle,
    },
    UserList: {
      constructor: UserList,
      props: {
        loadItemsByUser: this.loadItemsByUser,
        appendUser: this.appendUser,
        removeUser: this.removeUser,
      }
    }
  });

  template () {
    return `      
      <h1 id="user-title" data-component="UserTitle"></h1>
      <section data-component="UserList"></section>
    `;
  }
}
