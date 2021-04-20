export const UserButtonTemplate = ({ _id, name }, selectedUser) =>
  `<button
    data-id="${_id}"
    data-type="user"
    data-name=${name}
    class="ripple${selectedUser._id === _id ? ' active' : ''}"
  >
    ${name}
  </button>`;
