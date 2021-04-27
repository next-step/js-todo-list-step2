import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

export default async function Todos(userTodoList = []) {
  new TodoInput();

  try {
    const fetchItems = await userTodoList;
    new TodoList().setState(fetchItems);
  } catch (error) {
    console.error(error);
  }
}