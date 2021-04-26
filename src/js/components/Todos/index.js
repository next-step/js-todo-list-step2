import TodoList from './TodoList.js';

export default async function Todos(userTodoList = []) {
  try {
    const fetchItems = await userTodoList;
    new TodoList().setState(fetchItems);
    return fetchItems;
  } catch (error) {
    console.error(error);
    return [];
  }
}