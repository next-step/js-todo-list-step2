# 🚀 두번째 미션 - Todo List for Team!

## 🎯 요구사항

- [X] 1. User 추가하기
- [X] 2. User의 투두리스트 불러오기
- [X] 3. User 삭제하기
- [X] 4. todoItem 추가하기
- [X] 5. todoItem 불러오기
- [X] 6. todoItem complete하기
- [X] 7. todoItem 삭제하기
- [X] 8. todoItem contents 내용 수정하기


## 🎯🎯 심화 요구사항

- [X] 1. 데이터를 불러오기전 로딩바를 이용해, 사용자가 데이터가 불러와지고 있다는 것을 보여줍니다.
- [X] 2. fetch api 사용하는 부분을 async await을 사용하여 리팩토링합니다.
- [X] 3. github issue에서 라벨을 붙이는 것처럼, 우선순위에 따라서 badge를 추가합니다.
- [X] 4. ES6 impot & export를 이용해 자바스크립트 파일을 리팩토링합니다.

## 🕵️‍♂️ 제약사항

- [X] 1. User의 이름은 최소 2글자 이상이어야 합니다.

## 🗂 디렉토리 구조

```plantext
├── LICENSE
├── README.md
├── css
│   └── app.css
├── index.html
├── package-lock.json
├── package.json
└── src
   ├── api
   │   └── api.js - fetch를 통해 API와 통신하는 기능을 모아놓은 모듈
   ├── components
   │   ├── todoList - todoList와 관련된 모듈을 모아놓은 폴더
   │   │   ├── addTodo.js 
   │   │   ├── changePriority.js
   │   │   ├── deleteAllTodo.js
   │   │   ├── deleteTodo.js
   │   │   ├── editTodo.js
   │   │   ├── filterTodo.js
   │   │   ├── loadTodos.js
   │   │   ├── toggleTodo.js
   │   │   └── todoList.js - todoList와 관련된 모듈들을 초기화하고 EventListener를 등록하는 모듈
   │   └── userList
   │       ├── addUser.js
   │       ├── deleteUser.js
   │       ├── loadUsers.js
   │       ├── selectUser.js
   │       └── userList.js - userList와 관련된 모듈들을 초기화하고 EventListener를 등록하는 모듈
   ├── constant - 상수들을 모아놓은 폴더
   │   ├── api.js
   │   ├── todo.js
   │   └── user.js
   ├── index.js
   └── utils
       └── localStorage.js


8 directories, 27 files
```
