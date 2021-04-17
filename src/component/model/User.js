class User {
	constructor({ id, name, todoList }) {
		this._id = id;
		this._name = name;
		this._todoList = todoList;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	set name(name) {
		this._name = name;
	}

	get todoList() {
		return this._todoList;
	}

	set todoList(todoList) {
		this._todoList = todoList;
	}
}

export default User;
