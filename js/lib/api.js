const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = () => {

}
//요청 보내는 함수
const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    throw new Error(data.status)
  }
  return await response.json();
};

const api = {
  loadToDos: () => {
    return request(`${BASE_URL}/api/users`);
  },
  
}

export default api;


