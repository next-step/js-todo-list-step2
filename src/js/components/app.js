import TodoApp from "./todo/todoApp.js";
import UserApp from "./user/userApp.js";

export default function App() {
  const userApp = new UserApp();
  const todoApp = new TodoApp();
  userApp.init();
  todoApp.init();
}
