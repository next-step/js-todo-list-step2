import UserTitle from "../components/UserTitle.js";

function UserTitleContainer($dom, store) {
    let prevSelectedUserId;

    return () => {
        const {selectedUserId, userList} = store.getState();
        if (prevSelectedUserId !== selectedUserId) {
            prevSelectedUserId = selectedUserId;
            const userIndex = userList.findIndex(user=>user._id===selectedUserId);
            $dom.innerHTML = UserTitle({user:userList[userIndex]?.name});
        }
    }
}

export default UserTitleContainer;