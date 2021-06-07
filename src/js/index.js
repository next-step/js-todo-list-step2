const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";


const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (userName == null || userName == undefined)
        return;
    if (userName.length < 2)
        alert("사용자 이름은 최소 2글자 이상입니다.");

    // 사용자 추가하기
    $.ajax({
        type: "POST",
        url: `${baseUrl}/api/users`,
        data: { "name": userName },
        success: function(result) {
            getAllUser(result._id);
        }
    });
}

//USERlIST 호출
function getAllUser(id) {
    $.ajax({
        type: "GET",
        url: `${baseUrl}/api/users`,
        success: function(result) {
            createUserBtn(result, id);
        }
    })
}

//버튼생성
function createUserBtn(userListArr, focusId) {
    let userListDiv = document.getElementById("user-list");
    document.querySelector('.active').className = 'ripple';

    for (var i = 0; i < userListArr.length; i++) {
        let button = document.createElement("button");

        if (userListArr[i]._id === focusId) {
            button.setAttribute('class', 'ripple active');
        } else {
            button.setAttribute('class', 'ripple');
        }

        button.innerText = userListArr[i].name;
        userListDiv.prepend(button);
    }
}

function getTodoListByUserId(userId) {
    $.ajax({
        type: "GET",
        url: `${baseUrl}/api/users/:userId`,
        success: function(result) {
            createUserBtn(result, id);
        }
    })
}


function deleteUser() {
    $.ajax({
        type: "DELETE",
        url: `${baseUrl}/api/users/:userId`,
        success: function(result) {
            createUserBtn(result, id);
        }
    })
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler);