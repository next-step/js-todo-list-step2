import { getUsersAPI } from "./api/requests.js";
import TodoUsers from "./components/TodoUsers/index.js";
import TodoItems from "./components/TodoItems/index.js";
import TodoTotal from "./components/TodoTotal/index.js";
import TodoInput from "./components/TodoInput/index.js";
import TodoDeleteAll from "./components/TodoDeleteAll/index.js";
import TodoFilter from "./components/TodoFilter/index.js";
import { $ } from "./utils/selectors.js";

export default class App {
  constructor(store, initState) {
    this.state = initState;
    this.store = store;
    this.init();
  }
  init = () => {
    this.getData();
    this.store.registerObserver(
      //prettier-ignore
      new TodoInput($(".new-todo"), { 
        getState: this.getState, 
        setState: this.setState 
      }),
      new TodoUsers($("#user-list"), {
        getState: this.getState,
        setState: this.setState,
      }),
      new TodoItems($(".todo-list"), {
        getState: this.getState,
        setState: this.setState,
      }),
      new TodoTotal($(".todo-count"), { getState: this.getState }),
      new TodoFilter($(".filters"), {
        getState: this.getState,
        setState: this.setState,
      }),
      new TodoDeleteAll($(".clear-completed"), {
        getState: this.getState,
        setState: this.setState,
      })
    );
  };
  getState = () => {
    return this.state;
  };
  setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.store.notifyObservers();
  };
  getData = async () => {
    const data = await getUsersAPI();
    const newState = {
      ...this.state,
      users: data,
      userName: data[0].name,
      userId: data[0]._id,
    };
    this.setState(newState);
  };
}
