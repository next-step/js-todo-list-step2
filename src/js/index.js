// import * as render from "./render.js";
import * as api from "./api.js";
import { userRender } from "./userRender.js";
import { todoRender } from "./todoRender.js";

// userRender();
// todoRender();
async function init() {
  await userRender();
  await todoRender();
}

init();

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