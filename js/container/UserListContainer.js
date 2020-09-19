import {setUserId} from "../reducer.js";
import UserList from "../components/UserList.js";

function UserListContainer($dom, store) {
    let prevSelectedUserId;
    let prevUserList;

    $dom.addEventListener('click', ({target: {dataset}}) => {
        const {id} = dataset;
        store.dispatch(setUserId({selectedUserId:id}));
    })

    return () => {
        const {selectedUserId, userList} = store.getState();
        if (prevSelectedUserId !== selectedUserId || prevUserList !== userList) {
            prevSelectedUserId = selectedUserId;
            prevUserList = userList;
            $dom.innerHTML = UserList({userList, selectedUserId});
        }
    }
}

export default UserListContainer;
