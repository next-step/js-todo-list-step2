export class Member {
  constructor({_id = "", name, todoList = [] }) {
    this.validate(name);

    this._id = _id;
    this.name = name;
    this.todoList = todoList;
  }

  validate = (name) => {
    if (!name || name.length < 2){
      throw new Error("2글자 이상의 이름을 입력해주세요")
    }
  };
}
