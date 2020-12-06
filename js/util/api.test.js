import { addUser, getUser, getUserList } from './index.js'

const user = {name : 'test123123'}

describe('API TEST', () => {
  it('getUserList', async () => {
    const result = await getUserList();
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
    console.log(res)
    expect(result['_name']).toEqual(res['_name'])

  })

})


