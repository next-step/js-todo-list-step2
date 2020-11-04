import { TodoStore } from "../stores/index.js";

class Event {
  static toggleCompleted = ({ _id, isCompleted }) => {
    TodoStore.toggleCompleted({ _id, isCompleted });
  };

  static changeActiveUser = ({ activeUser }) => {
    TodoStore.changeActiveUser({ activeUser });
  };
}

export default Event;
