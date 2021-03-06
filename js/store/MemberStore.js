import { MemberApiService } from "/js/api/modules/member.js";

function MemberStore() {
  //{_id, name, todoList}
  this.members = [];
  this.nowMemberName = "";

  this.getAllMembers = function () {
    return this.members;
  };

  this.getNowMemberName = function () {
    return this.nowMemberName;
  };

  this.addMember = function (member) {
    this.members.push(member);
    sort(this.members);
  };

  const sort = (members) => {
    members.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  };

  this.init = async function () {
    const members = await MemberApiService.findAllMember();
    sort(members);
    this.members = members;
    this.nowUserName = members[0].name;
  };
}

export const $memberStore = new MemberStore();
