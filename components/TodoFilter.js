function TodoFilter({ filterTodo }) {
  const $filters = document.querySelector('.filters');

  $filters.addEventListener('click', (e) => {
    Array.from($filters.getElementsByTagName('a')).forEach((el) =>
      el.classList.remove('selected')
    );
    const [_, mode = 'all'] = e.target.href.split('#/');
    filterTodo(mode);
    e.target.classList.add('selected');
  });
}

export default TodoFilter;
