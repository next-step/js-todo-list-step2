import { memberApi } from "/js/api/modules/member.js";

export function Member() {
  //{member: {_id, name, todoList}}
  this.members = [];
  this.nowMember = "";

  this.addMember = (member) => {
    this.members.push(member);
    this.setNowMember(member);
    sortByName(this.members);
  };

  const sortByName = (members) => {
    members.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  };

  this.deleteMember = (deleteMember) => {
    this.members = this.members.filter((member) => member !== deleteMember);
    this.setNowMember(this.members[0]);
  };

  this.getMembers = () => {
    return this.members;
  };

  this.setMembers = (members) => {
    sortByName(members);
    this.members = members;
  };

  this.getNowMember = function () {
    return this.nowMember;
  };

  this.setNowMember = (member) => {
    this.nowMember = member;
  };

  this.setNowMemberById = (id) => {
    this.nowMember = this.members.find((member) => member._id === id);
  };

  this.init = async () => {
    const members = await memberApi.findAllMembers();
    this.setMembers(members);
    console.log(members);
    let nowMember = this.members[0];
    this.setNowMember(nowMember);
  };
}
