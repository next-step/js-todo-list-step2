import {
  getTodoItems,
  postTodoItem,
  deleteTodoItem,
  reviseTodoItem,
} from "./Fetch.js";
const PRIORITY = {
  NONE: `<select class="chip select">
  <option value="0" selected>순위</option>
  <option value="1">1순위</option>
  <option value="2">2순위</option>
</select>`,
  FIRST: `<span class="chip primary">1순위</span>
`,
  SECOND: `<span class="chip secondary">2순위</span>`,
};
const $todoList = document.querySelector(".todo-list");
let USERID = "";

export const initTodoList = () => {
  addListeners();
  const $newTodo = document.querySelector(".new-todo");
  $newTodo.addEventListener("keyup", addItem);
};

export const renderTodoListOfUser = async ({ target }) => {
  const classes = target.className.split(" ");
  USERID = target.id;

  if (!classes.includes("userBtn")) return false;
  const todoList = await getTodoItems(USERID);
  assignTodoList(todoList);
};

const assignTodoList = (todoList) => {
  $todoList.innerHTML = `<li>
  <div class="view">
    <label class="label">
      <div class="animated-background">
        <div class="skel-mask-container">
          <div class="skel-mask"></div>
        </div>
      </div>
    </label>
  </div>
</li>`;
  todoList.map((todo) => {
    const todoItem = createTodoItem(todo);
    $todoList.appendChild(todoItem);
  });
};

const createTodoItem = (todo) => {
  const { _id, contents, isCompleted, priority } = todo;
  const $li = document.createElement("li");
  $li.setAttribute("id", _id);
  $li.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
        <label class="label">
          ${PRIORITY[priority]}
           ${contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${contents}" />
  `;
  return $li;
};

const addListeners = () => {
  $todoList.addEventListener("click", deleteItem);
  $todoList.addEventListener("dblclick", onEditMode);
  $todoList.addEventListener("keyup", editContent);
};
const onEditMode = ({ target }) => {
  if (!target.classList.contains("label")) return;
  target.closest("li").classList.add("editing");
};
const editContent = ({ target, key }) => {
  if (!target.classList.contains("edit") || key !== "Enter") return;

  const newContent = target.value;
  const parantLi = target.closest("li");
  parantLi.classList.remove("editing");
  console.log(parantLi.querySelector(".label"));
  parantLi.querySelector(".label").innerHTML = newContent;

  reviseTodoItem(USERID, parantLi.id, newContent);
};
const deleteItem = ({ target }) => {
  if (target.className !== "destroy") return;
  const $li = target.closest("li");
  const _id = $li.id;
  $todoList.removeChild($li);
  deleteTodoItem(USERID, _id);
};

const addItem = async ({ target, key }) => {
  if (key !== "Enter") return;
  const todoItem = await postTodoItem(USERID, target.value);
  target.value = "";
  const $todoItem = createTodoItem(todoItem);
  console.log($todoItem);
  $todoList.appendChild($todoItem);
};
