# 🚀 두번째 미션 - Todo List for Team!

이번 미션은 Ajax를 이용하여 TodoList를 발전시키는 미션입니다. 비동기 통신으로 데이터를 관리할 경우 자바스크립트의 비동기라는 특성을 더욱 깊이있게 이해할 수 있습니다

## 하고싶은것
- store 자동화
- dom 자동화 
- 이벤트 다시 분리
- 등등 리팩토링, 에러처리 다시 점검
- fetch 액션이 있은 후 render 규칙을 적용할 때 (item 삭제나, 우선순위 변경, Content 변경, item 추가)
    1. 항상 todolist 의 새로운 모두 업데이트 한다.
        - 이렇게 생각한 이유는, database 를 여럿이 쓰기 때문에, 언제 데이터가 사라지고 바뀔지 몰라, 매번 최신의 데이터를 불러와야 한다고 생각하기 때문 입니다. 
    2. todoList 의 바뀐 item 만 업데이트
        
    - 1번이 불필요한 이유는 todoList 를 socket 을 쓰지 않고 여럿이서 같이 쓰는 상황을 고려할 필요가 없는가? 
    - 어떤 사람이 없앤 item 을, 내가 수정하는 api 를 호출하면, 어차피 에러를 반환하기 때문에 그때 그때 다시 업데이트를 해주면 될까? 
    - 아니면 매번마다 미리 최신의 todoList 를 보여줘서 에러를 최대한 예방 하는 것이 좋을까?
    - 에러를 최대한 예방한다고 해도, 항상 예방이 되는 것이 아니므로 차라리 2번을 하는게 나을까? 
        
- userlist 와 todolist 를 배열에서 obj 으로 만들어보기, 
    1. 컴포넌트에서 prop 으로 데이터를 내려주는 방식 
        - 하위 컴포넌트의 렌더링만 필요한 문제지만, prop 를 내려준 부모를 렌더링을 해야 정상적으로 하위 컴포넌트를 렌더링 할 수 있다.
        - props 에 따라 자동으로 렌더 되는 시스템? 
        - 그냥 통째로 부모를 다시 렌더링을 해도 무방한가?  
    2. prop 으로 오직 item Id 만 내려주고, 매번 하위 component 마다 props 로 내려받은 item id 로 store 에서 필요한 값 탐색 
        - 데이터를 obj 으로 만들면 탐색시간이 덜 걸릴 것 같음
    - 2번을 먼저 해보고 1번을 시도해볼까? 
    - 어떤게 나을까? 
    
- 계속 욕심이 나면... 스텝 2 못끝낼듯...





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

## 📝 API

### User list 불러오기

| method | uri |
|---|---|
|GET|/api/users|

```javascript
{
 response: [...]
}
```

### User 추가하기

| method | uri |
|---|---|
|POST|/api/users|

```javascript
{
 requestBody: {
   "name": "string"
 },
 response: {
   "_id": "string",
   "name": "string",
   "todoList": []
  }
}
```

### User 불러오기

| method | uri |
|---|---|
|GET|/api/users/:userId|

```javascript
{
 response: {
   "_id": "string",
   "name": "string",
   "todoList": [...]
  }
}
```

### User 삭제하기

| method | uri |
|---|---|
|DELETE|/api/users/:userId|

```javascript
{
 response: {}
}
```

### User의 Todo Item 불러오기

| method | uri |
|---|---|
|GET|/api/users/:userId/items/|
```javascript
{
 response: [...]
}
```


### User의 Todo Item 추가하기

| method | uri |
|---|---|
|POST|/api/users/:userId/items/|
```javascript
{
 requestBody: {
   "contents": "string"
 },
 response: {
   "_id": "string",
   "name": "string",
   "todoList": [...]
  }
}
```


### User의 Todo Item 전부 삭제하기

| method | uri |
|---|---|
|DELETE|/api/users/:userId/items/|
```javascript
{
 response: {
   "_id": "string",
   "name": "string",
   "todoList": []
  }
}
```

### User의 Todo Item 1개 삭제하기

| method | uri |
|---|---|
|DELETE|/api/users/:userId/items/:itemId|
```javascript
{
 response: {
   "_id": "string",
   "name": "string",
   "todoList": [...]
  }
}
```

### User의 Todo Item 내용 수정하기

| method | uri |
|---|---|
|PUT|/api/users/:userId/items/:itemId|
```javascript
{
 requestBody: {
   "contents": "string"
 },
 response: {
  "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean"
  }
}
```

### User의 Todo Item 우선순위 수정하기

| method | uri |
|---|---|
|PUT|/api/users/:userId/items/:itemId/priority|
```javascript
{
 requestBody: {
   "priority": "string" // 'NONE', 'FIRST', 'SECOND'
 },
 response: {
   "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean"
  }
}
```


### User의 Todo Item complete toggle

| method | uri |
|---|---|
|PUT|/api/users/:userId/items/:itemId/toggle|
```javascript
{
 response: {
   "_id": "string",
   "contents": "string",
   "priority": "string",
   "isCompleted": "boolean"
  }
}
```


<br/><br/>

# ☕️ 코드리뷰 모임 - Black Coffee
<br>

> '훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다'. <br> A.M. 린드버그(미국의 작가, 수필가) -

<br>

블랙커피처럼 서로를 자극해주고, 동기부여 해주며, 그 성장과정으로 인해 의미있는 가치를 만들어내고자 하는   
**프론트엔드 코드리뷰 모임** ☕️ **Black Coffee**입니다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👨‍💻 Code Review 👩‍💻
아래 링크들에 있는 리뷰 가이드를 보고, 좋은 코드 리뷰 문화를 만들어 나가려고 합니다.  
- [코드리뷰 가이드1](https://edykim.com/ko/post/code-review-guide/)
- [코드리뷰 가이드2](https://wiki.lucashan.space/code-review/01.intro.html#_1-code%EB%A5%BC-%EB%A6%AC%EB%B7%B0%ED%95%98%EB%8A%94-%EC%82%AC%EB%9E%8C%EB%93%A4%EC%9D%80-%EC%96%B4%EB%96%A4%EA%B2%83%EC%9D%84-%EC%A4%91%EC%A0%90%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%82%B4%ED%8E%B4%EC%95%BC%ED%95%98%EB%8A%94%EA%B0%80)

<br>

## 👏 Contributing
만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요. 

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/next-step/js-todo-list-step3/issues) 에 등록 후 @eastjun에게 dm을 보내주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/next-step/js-todo-list-step3/blob/master/LICENSE) licensed.



