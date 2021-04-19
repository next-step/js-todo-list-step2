import { checkEmpty, checkNull } from "./stringUtils.js";

export function checkClassName(event, name) {
  return event.target.className === name;
}

export function checkLocalName(event, name) {
  return event.target.localName === name;
}

export function checkKey(event, key) {
  return event.key === key;
}

export function isEmptyValue(event) {
  const value = getValue(event);
  return checkEmpty(value);
}

export function getClassName(event) {
  return event.target.className;
}

export function getValue(event) {
  return event.target.value;
}

export function getClassLiId(event) {
  return event.target.closest("li").getAttribute("data-id");
}