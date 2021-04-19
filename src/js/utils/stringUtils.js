export function checkNull(str) {
  if (str == null || str == "" || str == undefined) {
    return true;
  }
  return false;
}

export function checkEmpty(str) {
  return checkNull(str) || str.length < 2;
}