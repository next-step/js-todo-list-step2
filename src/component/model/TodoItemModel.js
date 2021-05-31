class TodoItemModel {
	constructor({ contents, id, isCompleted, priority }) {
		this._contents = contents;
		this._id = id;
		this._completed = isCompleted || false;
		this._editing = false;
		this._priority = priority || "NONE";
	}

	get contents() {
		return this._contents;
	}

	set contents(contents) {
		this._contents = contents;
	}

	get id() {
		return this._id;
	}

	get completed() {
		return this._completed;
	}

	set completed(completed) {
		this._completed = completed;
	}

	get editing() {
		return this._editing;
	}

	set editing(editing) {
		this._editing = editing;
	}

	get priority() {
		return this._priority;
	}

	set priority(priority) {
		this._priority = priority;
	}
}

export default TodoItemModel;
