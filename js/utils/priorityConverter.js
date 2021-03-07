export const priorityClassConverter = (priority) => {
  switch (priority) {
    case "FIRST":
      return "primary";
    case "SECOND":
      return "secondary";
  }
};

export const priorityValueConverter = (priority) => {
  switch (priority) {
    case "FIRST":
      return "1";
    case "SECOND":
      return "2";
    case "1":
      return "FIRST"
    case "2":
      return "SECOND"
  }
};
