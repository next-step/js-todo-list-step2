export const UserTitle = () => {
  const dom = document.createElement('div');

  const render = () => {
    dom.innerHTML = `
    <h1 id="user-title" data-username="eastjun">
    <span><strong>eastjun</strong>'s Todo List</span>
  </h1>
    `;
  };
  render();
  return dom;
};
