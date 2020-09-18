const TodoFilter = () => {
  const dom = document.createElement('ul');
  dom.classList.add('filters');

  const render = () => {
    dom.innerHTML = `
      <li>
        <a href="/#" class="all selected" >전체보기</a>
      </li>
      <li>
        <a href="#active" class="active">해야할 일</a>
      </li>
      <li>
        <a href="#completed" class="completed">완료한 일</a>
      </li>
    `;
  };

  return { dom, render };
};

export default TodoFilter;