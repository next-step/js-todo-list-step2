import { API } from '../api.js';
import { getCurrentUser } from '../localStorage.js';
import { loadTodos } from './loadTodos.js';

const editTodoItem = async (target) => {
    const newContents = target.value.replace(/ +/g, " ");
    if(!newContents.trim()){
        alert('내용을 입력해주세요.');
        return;
    }
    const $li = target.closest('li');
    const { id } = $li.dataset;

    const userId = getCurrentUser();
    await API.editTodo(userId, id, newContents);
    loadTodos(userId);

};

const revertTodoItem = (target, originalVal) => {
    target.value = originalVal;
    target.closest('li').classList.remove('editing');
};

export const editTodo = ({ target, key }, originalVal) => {
    const keyList = {
        Enter: editTodoItem,
        Escape: revertTodoItem,
    };
    return keyList[key] && keyList[key](target, originalVal);
};
