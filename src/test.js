var a = {
  b: {
    c: function () {
      let what = this;
      console.log(what);
    },
  },
};
a.b.c(); // this는 a.b
