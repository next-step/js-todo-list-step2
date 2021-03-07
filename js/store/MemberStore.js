import { MemberApiService } from "/js/api/modules/member.js";
import { FILTER_STATE } from "/js/utils/constants.js";
import { notEqualToById } from "/js/utils/util.js";

function Store() {
  //{member: {_id, name, todoList}}
  this.members = [];
  this.items = [];
  this.nowMemberId = "";
  this.filterState = FILTER_STATE.ALL;

  this.addMember = (member) => {
    this.members.push(member);
    this.setNowMember(member._id);
    sortByName(this.members);
  };

  const sortByName = (members) => {
    members.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  };

  this.deleteMember = (memberId) => {
    this.members = this.members.filter((member) =>
      notEqualToById(member._id, memberId)
    );
    this.setNowMember(this.members[0]._id);
  };

  this.getMembers = () => {
    return this.members;
  };

  this.setMembers = (members) => {
    sortByName(members);
    this.members = members;
  };

  this.setItems = (items) => {
    this.items = items;
  };

  this.getItems = () => {
    return this.items;
  };
  this.getNowMemberId = function () {
    return this.nowMemberId;
  };

  this.setNowMember = (id) => {
    this.nowMemberId = id;
  };

  this.init = async () => {
    const members = await MemberApiService.findAllMembers();
    this.setMembers(members);

    const selectedMemberId = this.members[0]._id;
    this.setNowMember(selectedMemberId);

    const todoItems = await MemberApiService.findTodoItemBy(selectedMemberId);
    this.setItems(todoItems);
  };
}

export const $store = new Store();
