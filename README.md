## `domuk-k`의 구현노트
- [미션 1](https://github.com/next-step/js-todo-list-step1/tree/domuk-k)과 이어지는 기능 구현
  - react-jsx의 렌더링 로직을 따라 구현하여 직접 만든 `Reilly.js` 유지 보수
  - 추가 기능 구현에 필요한 모듈에 대해, 일관성을 가지고 프로젝트 디렉토리 구조 확장

- UI 마크업 설계 및 UX 관점에 의한 미션2의 기본제공 코드 변경
  - 선언적 컴포넌트 모듈 구성 -  `js/components` - 으로 진행중이므로 정적 마크업 삭제.
  - 일부 접근성 / 시맨틱 사항에 보완 및 추가 - 개인적인 해석과 수정 노력
  - `CLP`(Cumulative Layout Shift) 및 [`Web Vital`](https://web.dev/vitals/) 측면에서 불리한 마크업/스타일링 요소 수정
  - 초기 화면 및 로딩 시점의 화면 설계 - TBD

- 비동기 미션에 관한 구현 방향
  - 라이브러리 `axios`의 인터페이스를 닮은 라이브러리 `Hermes.js` 구현
  - 위 라이브러리를 활용한 HTTP 요청과 에러처리를 추상화한 모듈 `js/services/TodoService` 구현


---

# ☕️ 코드리뷰 모임 - Black Coffee
<br>

> '훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다'. <br> A.M. 린드버그(미국의 작가, 수필가) -

<br>

블랙커피처럼 서로를 자극해주고, 동기부여 해주며, 그 성장과정으로 인해 의미있는 가치를 만들어내고자 하는   
**프론트엔드 코드리뷰 모임** ☕️ **Black Coffee**입니다.

<br>

# 🚀 두번째 미션 - Todo List for Team!

이번 미션은 Ajax를 이용하여 TodoList를 발전시키는 미션입니다. 비동기 통신으로 데이터를 관리할 경우 자바스크립트의 비동기라는 특성을 더욱 깊이있게 이해할 수 있습니다

## 🎯 요구사항

- [ ] 1. User 추가하기
- [ ] 2. User의 투두리스트 불러오기
- [ ] 3. User 삭제하기
- [ ] 3. todoItem 추가하기
- [ ] 4. todoItem 불러오기
- [ ] 5. todoItem complete하기
- [ ] 6. todoItem 삭제하기
- [ ] 7. todoItem contents 내용 수정하기


## 🎯🎯 심화 요구사항

- [ ] 1. 데이터를 불러오기전 로딩바를 이용해, 사용자가 데이터가 불러와지고 있다는 것을 보여줍니다.
- [ ] 2. fetch api 사용하는 부분을 async await을 사용하여 리팩토링합니다.
- [ ] 3. github issue에서 라벨을 붙이는 것처럼, 우선순위에 따라서 badge를 추가합니다.
- [ ] 4. ES6 impot & export를 이용해 자바스크립트 파일을 리팩토링합니다.

## 🕵️‍♂️ 제약사항

- [ ] 1. User의 이름은 최소 2글자 이상이어야 합니다.

<br/><br/>


