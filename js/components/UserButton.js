const UserButton = ({_id, name, active}) => `
    <button class="ripple${active ? ' active' : ''}" data-id=${_id}>
        ${name}
    </button>
`;

export default UserButton;