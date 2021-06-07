import * as todoAPI from '../../apis/todos';

// 액션 타입
export const CHANGE_TYPE = 'todos/CHANGE_TYPE';
export const CHANGE_MODE = 'todos/CHANGE_MODE';

export const GET_TODOS = 'todos/GET_TODO';
export const GET_TODOS_SUCCESS = 'todos/GET_TODO_SUCCESS';
export const GET_TODOS_ERROR = 'todos/GET_TODO_ERROR';

export const ADD_TODO = 'todos/ADD_TODO';
export const ADD_TODO_SUCCESS = 'todos/ADD_TODO_SUCCESS';
export const ADD_TODO_ERROR = 'todos/ADD_TODO_ERROR';

export const UPDATE_TODO = 'todos/UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = 'todos/UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_ERROR = 'todos/UPDATE_TODO_ERROR';

export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const TOGGLE_TODO_SUCCESS = 'todos/TOGGLE_SUCCESS';
export const TOGGLE_TODO_ERROR = 'todos/TOGGLE_TODO_ERROR';

export const REMOVE_TODO = 'todos/REMOVE_TODO';
export const REMOVE_TODO_SUCCESS = 'todos/REMOVE_TODO_SUCCESS';
export const REMOVE_TODO_ERROR = 'todos/REMOVE_TODO_ERROR';

export const REMOVE_ALL_TODOS = 'todos/REMOVE_ALL_TODOS';
export const REMOVE_ALL_TODOS_SUCCESS = 'todos/REMOVE_ALL_TODOS_SUCCESS';
export const REMOVE_ALL_TODOS_ERROR = 'todos/REMOVE_ALL_TODOS_ERROR';

export const UPDATE_PRIORITY = 'todos/UPDATE_PRIORITY';
export const UPDATE_PRIORITY_SUCCESS = 'todos/UPDATE_PRIORITY_SUCCESS';
export const UPDATE_PRIORITY_ERROR = 'todos/UPDATE_PRIORITY_ERROR';

// thunk 함수
export const getTodos = (id) => async (dispatch) => {
  dispatch({ type: GET_TODOS });
  try {
    const todos = await todoAPI.getTodos(id);
    dispatch({ type: GET_TODOS_SUCCESS, payload: todos });
  } catch (e) {
    dispatch({ type: GET_TODOS_ERROR, payload: e });
  }
};

export const addTodo = (id, contents) => async (dispatch) => {
  dispatch({ type: ADD_TODO });
  try {
    const todo = await todoAPI.addTodo(id, contents);
    dispatch({ type: ADD_TODO_SUCCESS, payload: todo });
  } catch (e) {
    dispatch({ type: ADD_TODO_ERROR, payload: e });
  }
};

// 초기값
const initialState = {
  loading: false,
  type: 'all',
  todos: [],
  error: null,
};

// 리듀서
export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    case CHANGE_MODE: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload
            ? { ...todo, editMode: !todo.editMode }
            : todo
        ),
      };
    }
    case GET_TODOS: {
      return {
        ...state,
        loading: true,
        todos: [],
        error: null,
      };
    }
    case GET_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: action.payload.map((todo) => ({ ...todo, editMode: false })),
        error: null,
      };
    }
    case GET_TODOS_ERROR: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: null,
      };
    }
    case ADD_TODO: {
      return {
        ...state,
        loading: true,
        todos: [],
        error: null,
      };
    }
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: [
          ...state.todos,
          {
            ...action.payload,
            editMode: false,
          },
        ],
        error: null,
      };
    case ADD_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        todo: [],
        error: action.payload,
      };
    }
    case UPDATE_TODO: {
      return {
        ...state,
        loading: true,
        todos: [],
        error: null,
      };
    }
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, contents: action.payload.contents }
            : todo
        ),
        error: null,
      };
    case UPDATE_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        loading: true,
        todos: [],
        error: null,
      };
    }
    case TOGGLE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) =>
          todo._id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
        error: null,
      };
    case TOGGLE_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    }
    case REMOVE_TODO: {
      return {
        ...state,
        loading: true,
        todos: [],
        error: null,
      };
    }
    case REMOVE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    case REMOVE_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    }
    case REMOVE_ALL_TODOS: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case REMOVE_ALL_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: null,
      };
    }
    case REMOVE_ALL_TODOS_ERROR: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    }
    case UPDATE_PRIORITY: {
      return {
        ...state,
        loading: true,
        todos: [],
        error: null,
      };
    }
    case UPDATE_PRIORITY_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id
            ? { ...todo, priority: action.payload.priority }
            : todo
        ),
        error: null,
      };
    }
    case UPDATE_PRIORITY_ERROR: {
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
