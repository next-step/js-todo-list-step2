function TodoFilter({ filterTodo }) {
  const $filters = document.querySelector('.filters');

  const onChangeFilter = (event) => {
    Array.from($filters.getElementsByTagName('a')).forEach((el) =>
      el.classList.remove('selected')
    );
    const [_, mode] = event.target.href.split('#/');
    filterTodo(mode || 'all');
    event.target.classList.add('selected');
  }

  $filters.addEventListener('click', onChangeFilter);
}

export default TodoFilter;
