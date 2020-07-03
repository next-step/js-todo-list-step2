export const ERROR_MESSAGE_MAP = {
  NOT_ELEMENT: "It Should be Element.",
  NOT_ARRAY: "It Should be Array",
  NOT_CREATED_BY_NEW: "It Should be created by new",
  NOT_OBJECT: "It Should be object type",
  NOT_STRING: "It Should be string",
  ZERO_LENGTH: "It Should not be 0 length",
  NOT_BOOLEAN: "It Should be Boolean",
  NOT_FUNCTION: "It Shold be Function",
  FETCH_FAIL: (status) => `fetch fail. status : ${status}`,
  FETCH_ERROR: (error) => `fetch error. error : ${error}`,
};

export const CLASS_NAME_MAP = {
  TOGGLE: "toggle",
  REMOVE: "destroy",
  LABEL: "label",
  FOCUS: "editing",
  ON_EDIT: "edit",
  SELECT: "select",
};

export const KEY_MAP = {
  ESC: "Escape",
  ENTER: "Enter",
};

export const FILTER_MAP = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};
