import { CLASS_NAME } from "../const/TODO.js";

export const $ = className => document.querySelector(`.${className}`);

export const addClassName = (target, className) => target.classList.add(className);

export const removeClassname = (target, className) => target.classList.remove(className);

export const todoItem = target => target.closest(`.${CLASS_NAME.TODO_ITEM}`);