const TodoCount = () => {
  const dom = document.createElement('span');
  dom.classList.add('todo-count');

  const render = () => {
    const count = 0;
    dom.innerHTML = `총 <strong>${ count }</strong> 개`;
  };

  return { dom, render };
};

export default TodoCount;