const UserButton = ({_id, name, active}) => `
    <button class="ripple${active ? ' active' : ''}" data-user-id=${_id}>
        ${name}
    </button>
`;

export default UserButton;