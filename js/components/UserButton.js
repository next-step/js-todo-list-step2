const UserButton = ({_id, name, active}) => `
    <button class="ripple${active ? ' active' : ''}" data-user-id=${_id} data-role="select">
        ${name}
    </button>
`;

export default UserButton;