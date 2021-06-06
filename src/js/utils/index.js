export function $(target) {
  return document.querySelector(target);
}
export function $$(target) {
  return document.querySelectorAll(target);
}

export function addEvent(target, eventName, eventFn) {
  if (target.length > 1) {
    target.forEach(function (tg) {
      tg.addEventListener(eventName, eventFn);
    });
  } else if (target.length !== 0) {
    if (target) {
      target.addEventListener(eventName, eventFn);
    }
  }
}

const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";

export async function fetchApi(url, option) {
  let result;
  const fullUrl = BASE_URL + (url ? "/" + url : "");
  console.log({ fullUrl, option });
  await fetch(fullUrl, option)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      result = json;
    });
  return result;
}
