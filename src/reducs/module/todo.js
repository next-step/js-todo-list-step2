import { createAction } from '../../lib/reducs';
import { TodoService } from '../../services';
import { FILTER_STATUS } from 'utils';
import { Todo } from '../../types';

export const FETCH_TODOS = 'FETCH_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const DELETE_ALL_TODOS = 'DELETE_ALL_TODOS';
export const TODO_ERROR = 'TODO_ERROR';
export const CHANGE_MODE = 'CHANGE_MODE';
export const SET_PRIORITY = 'SET_PRIORITY';
export const START_EDIT_TODO = 'START_EDIT_TODO';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const CONFIRM_EDIT = 'CONFIRM_EDIT';

const initialState = {
  todoList: null,
  editingId: null,
  mode: FILTER_STATUS.ALL,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todoList: action.payload,
      };
    case ADD_TODO:
      return { ...state, todoList: [action.payload, ...state.todoList] };
    case TOGGLE_TODO:
      return {
        ...state,
        todoList: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: action.payload,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todoList: [],
      };
    case SET_PRIORITY:
      return {
        ...state,
        todoList: action.payload,
      };
    case START_EDIT_TODO:
      return {
        ...state,
        editingId: action.payload,
      };
    case CANCEL_EDIT:
      return {
        ...state,
        editingId: null,
      };
    case CONFIRM_EDIT:
      return {
        ...state,
        todoList: action.payload,
        editingId: null,
      };
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addTodoAsync = content => async (dispatch, getState) => {
  try {
    const newTodo = await TodoService.add(
      getState().user.user._id,
      new Todo(content)
    );
    dispatch(createAction(ADD_TODO, newTodo));
  } catch (error) {
    dispatch(createAction(TODO_ERROR, error));
  }
};

export const toggleTodoAsync = (id, todoList) => async (dispatch, getState) => {
  try {
    await TodoService.toggleOne(getState().user.user._id, id);
    dispatch(createAction(TOGGLE_TODO, todoList));
  } catch (error) {
    dispatch(createAction(TODO_ERROR, error));
  }
};

export const deleteTodoAsync = (id, todoList) => async (dispatch, getState) => {
  try {
    await TodoService.deleteOne(getState().user.user._id, id);
    dispatch(createAction(DELETE_TODO, todoList));
  } catch (error) {
    dispatch(createAction(TODO_ERROR, error));
  }
};

export const deleteAllTodoAsync = () => async (dispatch, getState) => {
  try {
    await TodoService.deleteAll(getState().user.user._id);
    dispatch(createAction(DELETE_ALL_TODOS));
  } catch (error) {
    dispatch(createAction(TODO_ERROR, error));
  }
};

export const setPriorityTodoAsync = (id, priority) => async (
  dispatch,
  getState
) => {
  const { user } = getState().user;
  const { todoList } = getState().todo;

  try {
    const newTodo = await TodoService.setPriority(user._id, id, {
      priority,
    });

    const updatedTodoList = todoList.map(todo =>
      todo._id !== id ? todo : newTodo
    );

    dispatch(createAction(SET_PRIORITY, updatedTodoList));
  } catch (error) {
    dispatch(createAction(TODO_ERROR, error));
  }
};

export const confirmEdit = (id, contents) => async (dispatch, getState) => {
  const { user } = getState().user;
  const todoList = getState().todo.todoList.map(confirmedBy(id, contents));

  try {
    await TodoService.updateOne(user._id, id, { contents });
    dispatch(createAction(CONFIRM_EDIT, todoList));
  } catch (error) {
    dispatch(createAction(TODO_ERROR, error));
  }
};

export const changeFilterMode = mode => {
  return createAction(CHANGE_MODE, mode);
};
export const startEdit = editingId => {
  return createAction(START_EDIT_TODO, editingId);
};
export const cancelEdit = () => {
  return createAction(CANCEL_EDIT);
};

function confirmedBy(id, contents) {
  return todo => (todo._id !== id ? todo : { ...todo, contents });
}

export default todoReducer;
