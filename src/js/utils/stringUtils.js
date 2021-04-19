export const checkNull = str => str == null || str == "" || str == undefined;
export const checkEmpty = str => checkNull(str) || str.length < 2;
