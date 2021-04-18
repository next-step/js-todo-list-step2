import TodoApp from "./todo/todoApp.js";
import UserApp from "./user/userApp.js";

export default function App() {
  const todoApp = new TodoApp();
  const userApp = new UserApp(todoApp);
  userApp.init();
}
