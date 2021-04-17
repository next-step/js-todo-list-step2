import template from "../util/template.js";

function TodoList({ target, onDeleteButton, onCompleted, onEditing, onEdit }) {
	this.setState = (updatedTodoItems) => {
		this.render(updatedTodoItems);
	};

	const html = (itemModel) => {
		console.log(itemModel);
		const li = template("li", {
			class: `${itemModel.completed ? "completed" : ""} ${itemModel.editing ? "editing" : ""}`.trim(),
			onDblClick: onEditing.bind(null, itemModel.id)
		});

		const div = template("div", { class: "view" });

		const input = template(
			"input",
			itemModel.completed
				? {
						class: "toggle",
						type: "checkbox",
						checked: true,
						onChange: onCompleted.bind(null, itemModel.id)
				  }
				: {
						class: "toggle",
						type: "checkbox",
						onChange: onCompleted.bind(null, itemModel.id)
				  }
		);

		const label = template("label", { class: "label" });
		let priority;

		if (itemModel.priority === "NONE") {
			priority = template("select", { class: "chip select" });

			const options = [1, 2, 3].reduce((acc, cur, idx) => {
				let option;
				if (idx === 0) {
					option = template("option", { value: `${cur}`, selected: true });
					option.appendChild(document.createTextNode("순위"));
				} else {
					option = template("option", { value: `${cur}`, selected: true });
					option.appendChild(document.createTextNode(`${cur - 1}순위`));
				}

				acc.push(option);
				return acc;
			}, []);

			priority.append(...options);
		} else if (itemModel.priority === "FIRST") {
			priority = template("span", { class: "chip primary" });
			priority.appendChild(document.createTextNode("1순위"));
		} else {
			priority = template("span", { class: "chip secondary" });
			priority.appendChild(document.createTextNode("2순위"));
		}

		label.append(priority);
		label.append(document.createTextNode(itemModel.contents));

		const button = template("button", { class: "destroy", onClick: onDeleteButton.bind(null, itemModel.id) });

		const edit = template("input", {
			class: "edit",
			value: itemModel.contents,
			onKeyDown: onEdit.call(null, itemModel.id)
		});

		div.append(input, label, button);
		li.append(div, edit);
		return li;
	};

	this.render = (items) => {
		target.innerHTML = "";

		items.reduce((acc, cur) => {
			acc.append(html(cur));
			return acc;
		}, target);
	};
}

export default TodoList;
