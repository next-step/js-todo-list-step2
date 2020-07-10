export default function TodoList({ $wrapper, isLoading, todoList }) {
	const skeletonCount = todoList ? todoList.length : 5;

	if (!todoList) {
		return;
	}

	if (isLoading) {
		$wrapper.innerHTML = `<li>
        <div class="view">
          <label class="label">
            <div class="animated-background">
              <div class="skel-mask-container">
                <div class="skel-mask"></div>
              </div>
            </div>
          </label>
        </div>
      </li>`.repeat(skeletonCount);
	}

	setTimeout(() => {
		$wrapper.innerHTML = todoList.reduce((totalEl, { contents, isCompleted, priority }, index, { length }) => {
			const isCheck = isCompleted ? 'completed' : '';

			return (totalEl += `<li class="${isCheck}" data-todo-id="${index}">
          <div class="view">
            <input class="toggle" type="checkbox" ${!!isCheck ? 'checked' : ''} />
            <label class="label">
              ${contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${contents}" />
        </li>`);
		}, '');
	}, 500);
}
