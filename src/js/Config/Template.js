export const UserButtonTemplate = (user, selected = false) =>
  `
    <button
      data-type="user"
      ${Object.keys(user)
        .map((key) => `data-${key}="${user[key]}"`)
        .join('')}
      class="ripple${selected ? ' active' : ''}"
    >
      ${user.name}
    </button>
  `;

export const UserTitleTemplate = ({ name }) =>
  `
    <span>
      <strong>${name}</strong>'s Todo List
    </span>
  `;
