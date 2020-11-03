class Store {
  constructor() {
    this.state = {
      activeUser: "",
      users: [{ name: "", todoList: [], _id: "" }],
      user: {
        todoList: [],
      },
    };
    this.subscribers = [];
  }

  dispatch = (action) => {
    this.state = this.reducer(this.state, action);
    console.log(this.state);
    this.notify();
  };

  subscribe = (func) => {
    this.subscribers.push(func);
  };

  notify = () => {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  };

  reducer = (state, action) => {
    switch (action.type) {
      case LOAD_USERS:
        return {
          ...state,
          users: action.payload,
        };
      case LOAD_USER:
        return {
          ...state,
          activeUser: action.payload.name,
          user: action.payload,
        };
      default:
        return state;
    }
  };
}

export const LOAD_USERS = "LOAD_USERS";
export const LOAD_USER = "LOAD_USER";

export default Store;
