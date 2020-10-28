## 데모
[https://jho2301.github.io/js-todo-list-step2/](https://jho2301.github.io/js-todo-list-step2/)


## 🎯 요구사항

- [x] 1. User 추가하기
- [x] 2. User의 투두리스트 불러오기
- [x] 3. User 삭제하기
- [x] 3. todoItem 추가하기
- [x] 4. todoItem 불러오기
- [x] 5. todoItem complete하기
- [x] 6. todoItem 삭제하기
- [x] 7. todoItem contents 내용 수정하기


## 🎯🎯 심화 요구사항

- [x] 1. 데이터를 불러오기전 로딩바를 이용해, 사용자가 데이터가 불러와지고 있다는 것을 보여줍니다.
- [x] 2. fetch api 사용하는 부분을 async await을 사용하여 리팩토링합니다.
- [x] 3. github issue에서 라벨을 붙이는 것처럼, 우선순위에 따라서 badge를 추가합니다.
- [x] 4. ES6 impot & export를 이용해 자바스크립트 파일을 리팩토링합니다.

## 🕵️‍♂️ 제약사항

- [x] 1. User의 이름은 최소 2글자 이상이어야 합니다.


## 주안점
- 옵저버패턴을 통해서 컴포넌트의 상태 각각에 반응성을 구현하려고 시도했습니다. prop을 받는 자식컴포넌트가 subscribe메서드를 통해서 자기자신의 render함수를 등록하도록 했습니다. 따라서 미션1에서 부모컴포넌트가 자식컴포넌트의 render함수를 직접 호출하는 코드를 제거할 수 있었습니다.  상태가 업데이트 됨에 따라 render가 필요한 컴포넌트만 rerender됩니다. [(참고자료)](https://blog.jeremylikness.com/blog/client-side-javascript-databinding-without-a-framework/)


## +@
-  투두아이템 우선순위 뱃지 처리 ( 순위에 따라 정렬)
- user 생성 시, 생성된 user 자동 선택

## 추가로 해야할 것
- fetch로직에 try catch 적용해야 함
- local storage 활용 해서 최근에 보았던 user id 캐싱하기
