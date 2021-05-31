const priortyTemplate = {
	NONE: `
	<select class="chip select">
		<option value="NONE" selected="">순위</option>
		<option value="FIRST">1순위</option>
		<option value="SECOND">2순위</option>
  	</select>
`,
	FIRST: `
	<select class="chip primary">
		<option value="NONE">순위</option>
		<option value="FIRST" selected="">1순위</option>
		<option value="SECOND">2순위</option>
  	</select>
`,
	SECOND: `
	<select class="chip secondary">
		<option value="NONE">순위</option>
		<option value="FIRST">1순위</option>
		<option value="SECOND" selected="">2순위</option>
  	</select>
`,
};

export const template = {
	userTitleTemplate: (userName) =>
		`<span><strong>${userName}</strong>'s Todo List</span>`,
	userBtnTemplate: (id, userName) =>
		`<button class="ripple" data-id=${id} data-contents=${userName}>${userName}</button>`,
	todoItemTemplate: (id, inputText, completed, priority) =>
		`<li id=${id} class=${completed ? "completed" : "false"}>
			<div class="view">
				<input class="toggle" type="checkbox" id=${id} ${completed ? "checked" : ""}>
				<label class="label">
					${priortyTemplate[priority]}
					${inputText}
				</label>
			<button class="destroy" id=${id}></button>
			</div>
			<input class="edit" value=${inputText}>
		</li>
		`,
};
