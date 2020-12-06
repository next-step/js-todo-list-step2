import {
  addUser,
  addUserTodo,
  deleteUser,
  deleteUserTodo,
  deleteUserAllTodo,
  getUser,
  getUserList,
  getUserTodo, updateUserTodoContents, updateUserTodoPriority, toggleTodoComplete
} from './index.js'

const user = {name : 'test123123'}
const todo = {contents : 'todoTest'}
describe('API TEST', () => {
  it('getUserList', async () => {
    const result = await getUserList();
    console.log(result)
    expect(result[0]['_id']).toEqual('-2qS_EuGx');
  });

  it('addUser', async () => {
    const result = await addUser(user);
    expect(result['name']).toEqual(user.name);
  })

  it('getUser', async () => {
    const result = await addUser(user);
    const userid = result['_id'];
    const res = await getUser(userid);
    expect(result['_name']).toEqual(res['_name'])
  })

  it('deleteUser', async () => {
    const result = await addUser(user);
    const userid = result['_id'];
    await deleteUser(userid);
    const res = await getUser(userid);
    expect(res).toEqual({"message": "해당 user를 찾는데 에러가 발생했습니다.",})
  });

  it('getUserTodos', async () => {
    const result = await getUserTodo('MfsBxqGu8');
    expect(result.length).toBe(0);
  });

  it('addUserTodo', async () => {
    const result = await addUserTodo('MfsBxqGu8',todo);
    expect(result['contents']).toEqual(todo.contents);
  });

  it('deleteTodos', async () => {
    const result = await deleteUserAllTodo('MfsBxqGu8');
    expect(result).toEqual({"message": "Todo Item을 삭제하는데 에러가 발생했습니다."});
  });
  it('deleteTodo', async () => {
    const result = await deleteUserTodo('MfsBxqGu8', 'eeEzkh85-');
    expect(result).toEqual({"message": "Todo Item을 수정하는데 에러가 발생했습니다."});
  });

  it('updateTodo1', async () => {
    const result = await updateUserTodoContents('MfsBxqGu8', '9TYZSe8zJ', todo);
    expect(result).toBeGreaterThan(0);
  });

  it('updateTodo2', async () => {
    const prior = { priority: "FIRST"};
    const result = await updateUserTodoPriority('MfsBxqGu8', 'BFeXaLvP1', prior);
    expect(result.priority).toEqual(prior.priority);
  });

  it('updateTodo3', async () => {
    const result = await toggleTodoComplete('MfsBxqGu8', '40XRGnWCa');
    expect(result.isCompleted).toBeTruthy();
  });


})


