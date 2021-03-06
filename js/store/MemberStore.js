import { MemberApiService } from "/js/api/modules/member.js";
import { equalToById } from "/js/utils/util.js";

function MemberStore() {
  //{_id, name, todoList}
  this.members = [];
  this.nowMemberId = "";

  this.addMember = (member) => {
    this.members.push(member);
    sort(this.members);
  };

  this.render = (members) => {
    sort(members);
    this.members = members;
  };

  this.resetNowMember = () => {
    this.nowMemberId = this.members[0]._id;
  };

  this.getMembers = () => {
    return this.members;
  };

  this.getNowMemberId = function () {
    return this.nowMemberId;
  };

  const sort = (members) => {
    members.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  };

  this.init = async () => {
    const members = await MemberApiService.findAllMembers();
    this.render(members);
    this.resetNowMember();
  };
}

export const $memberStore = new MemberStore();
