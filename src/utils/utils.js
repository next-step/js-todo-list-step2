export function $(element) {
  return document.querySelector(element);
}

export function createUUID() {
  let date = new Date().getTime();

  const result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

  return result;
}
