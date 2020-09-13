//  <button class="ripple active">eastjun</button>

export const createUserButton = (id, user, isActive) => `
  <button class="ripple${
    isActive ? ' active' : ''
  }" data-user-id="${id}">${user}</button>
`;

export const createUserCreateButton = () => `
  <button class="ripple user-create-button">+ 유저 생성</button>
`;
