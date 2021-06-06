export const UserListContainer = () => {
  const dom = document.createElement('section');

  const render = () => {
    dom.innerHTML = `
       <button class="ripple user-create-button">+ 유저 생성</button>
       <button class="ripple user-delete-button" data-action="deleteUser">
       삭제 -
     </button>
      `;
  };

  render();
  return dom;
};
