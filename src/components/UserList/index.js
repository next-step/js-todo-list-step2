export const UserList = () => {
  const dom = document.createElement('div');
  dom.style.className = 'user-list';

  const render = () => {
    dom.innerHTML = `
      <button class="ripple active">makerjun</button>
      <button class="ripple">eastjun</button>
      `;
  };
  render();
  return dom;
};
