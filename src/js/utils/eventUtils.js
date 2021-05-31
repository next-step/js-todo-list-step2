import { checkEmpty } from "./stringUtils.js";

export const checkClassName = (event, name) => event.target.className === name;
export const checkLocalName = (event, name) => event.target.localName === name;
export const checkKey = (event, key) => event.key === key;
export const isEmptyValue = (event) => checkEmpty(getValue(event));

export const getClassName = (event) => event.target.className;
export const getValue = (event) => event.target.value;
export const getClassLiId = (event) =>
  event.target.closest("li").getAttribute("data-id");
export const getButtonId = (event) =>
  event.target.closest("button").getAttribute("data-id");
export const setSelect = (event) => event.target.classList.add("selected");
export const removeSelect = (event) => event.classList.remove("selected");

export const isUserTarget = (event) =>
  event.target.closest("user-list-item") !== null &&
  event.target.getAttribute("data-action") === "selectUser";
