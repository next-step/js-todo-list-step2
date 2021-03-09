
export function TodoTotalCount($div, context) {
  const $count = $div.querySelector('.todo-count > strong');
  const $filter = $div.querySelector('.filters');
  const $clear = $div.querySelector('.clear-completed');


  this.render = (todoItems, filter) => {
    $count.innerText = todoItems.length;
    $filter.innerHTML = renderHTML(filter);
  };

  const onDeleteAll = () => {
    context.deleteAll(); 
  }


  $filter.addEventListener('click', (e) =>
    context.render(e.target.classList.value)
  );

  $clear.addEventListener('click', onDeleteAll);



  const renderHTML = (filter) => {
    return `<li>
                    <a class="${filter === "all" ? "all selected" : "all"}" href="#">전체보기</a>
                </li>
                <li>
                    <a class="${filter === "active" ? "active selected" : "active"}" href="#active">해야할 일</a>
                </li>
                <li>
                    <a class="${filter === "completed"
                        ? "completed selected"
                        : "completed" }" href="#completed">완료한 일</a>
                </li>`;
  };
}
