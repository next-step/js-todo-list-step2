var a = {
  b: {
    c: function () {
      let what = this;
      console.log(what);
    },
  },
};
a.b.c(); // this는 a.b

const onUserCreateHandler = () => {
  const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
};

const userCreateButton = document.querySelector('.user-create-button');
userCreateButton.addEventListener('click', onUserCreateHandler);
