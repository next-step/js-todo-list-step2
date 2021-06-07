import { fetchAPI, METHOD } from './index';

// 모든 유저 조회
export const getUsers = () => fetchAPI();

// 유저 조회
export const getUser = (userId) => fetchAPI(`/${userId}`, METHOD.GET);

// 유저 추가
export const addUser = (name) => fetchAPI('', METHOD.POST, { name });

// 유저 삭제
export const deleteUser = (userId) => fetchAPI(`/${userId}`, METHOD.DELETE);
