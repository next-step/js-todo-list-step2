import { getUsersList, setUser } from './api.js'
import UserController from './components/UserController.js';
import UserList from './components/UserList.js';
import UserName from './components/UserName.js';
export default function App(){
  this.users = [];
  this.init = async() => {
    this.users = await getUsersList();
    UserList(this.users)
  }
  new UserController({
    userCreateHandler : async ()=>{
      const name = prompt("추가하고 싶은 이름을 입력해주세요.");
      if(name.length < 2) {
        alert("이름은 최소 2글자 이상이어야 합니다.")
        return;
      }
      await setUser({name});
      this.init()
    }
  });
    // UserName("test")
}

