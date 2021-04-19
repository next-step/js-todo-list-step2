// import { userRender } from "./userRender.js";
// import { addUserList } from "./addUserList.js";
// import { delUserAll } from "./delUserAll.js";\
import * as api from "./api.js";

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  addUserList(userName);
}
const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

// userRender();


// console.log(api.getUserList())
// console.log(api.addUser("test2222"))
// console.log(api.getUser("-LDXT6ltH"))
// api.delUser("pWfyQSbXS")
// console.log(api.getTodo("-LDXT6ltH"))
// api.addTodo("-LDXT6ltH","test12345")
// api.delTodoAll("-LDXT6ltH")
// api.delTodo("-LDXT6ltH","6AQYCaS-F")
// api.modTodo("-LDXT6ltH","NP-jHhJnE","AAAAA")
// api.setTodoPriority("-LDXT6ltH","NP-jHhJnE","FIRST")
// api.getTodoComplete
// console.log(api.getTodoComplete("-LDXT6ltH","NP-jHhJnE"))
// console.log(api.setTodoComplete("-LDXT6ltH","NP-jHhJnE"))