import { MemberApiService } from "/js/api/modules/member.js";

function UserStore() {
  //{_id, name, todoList}
  this.users = [];
  this.nowUserName = "";

  this.getAllUsers = function () {
    return this.users;
  };

  this.getNowUserName = function () {
    return this.nowUserName;
  };

  this.init = async function () {
    const data = await MemberApiService.findAllMember();
    this.users = data;
    this.nowUserName = data[0].name
  };
}

export const $userStore = new UserStore();
