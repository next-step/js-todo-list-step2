const Constants = {
  NONE: {
    value: "NONE",
    className: "",
    text: "",
  },
  FIRST: {
    value: "FIRST",
    className: "primary",
    text: "1순위",
  },
  SECOND: {
    value: "SECOND",
    className: "secondary",
    text: "2순위",
  },
};

const FILTER = {
  ALL: {
    state: "all",
    text: "전체보기",
    href: "/#",
  },
  ACTIVE: {
    state: "active",
    text: "해야할 일",
    href: "/#active",
  },
  COMPLETED: {
    state: "completed",
    text: "완료한 일",
    href: "/#completed",
  },
};

export { Constants, FILTER };
