const FILTER = {
  ALL: {
    state: "all",
    href: "/#",
    text: "전체보기",
  },
  ACTIVE: {
    state: "active",
    href: "/#active",
    text: "해야할 일",
  },
  COMPLETED: {
    state: "completed",
    href: "/#completed",
    text: "완료한 일",
  },
};

const PRIORITY = {
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

export { FILTER, PRIORITY };
