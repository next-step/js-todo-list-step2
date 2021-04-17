function TodoTitle(target) {
	this.setState = (title) => {
		this.render(title);
	};

	this.render = (title) => {
		target.innerHTML = title;
	};
}

export default TodoTitle;
