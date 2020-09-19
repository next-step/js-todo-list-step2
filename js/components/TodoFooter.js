const TodoFooter = ({filter, filteredList}) => `
    <span class="todo-count">총 <strong>${filteredList.length}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="/#" class="all ${filter==='all'?'selected':''}" data-role="filter" data-value="all">전체보기</a>
        </li>
        <li>
          <a href="#active" class="active ${filter==='active'?'selected':''}" data-role="filter" data-value="active">해야할 일</a>
        </li>
        <li>
          <a href="#completed" class="completed ${filter==='completed'?'selected':''}" data-role="filter" data-value="completed">완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
`;

export default TodoFooter;