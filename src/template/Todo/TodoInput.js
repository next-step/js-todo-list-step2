const TodoInput = () => {
  const dom = document.createElement('section');
  dom.classList.add('input-container');

  const render = () => {
    dom.innerHTML = `
        <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus />`
  };

  return { dom, render };
};

export default TodoInput;