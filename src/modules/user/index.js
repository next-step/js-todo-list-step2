import * as userAPI from '../../apis/user';

// 액션 타입
const GET_USERS = 'user/GET_USERS';
const GET_USERS_SUCCESS = 'user/GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'user/GET_USERS_ERROR';

const GET_USER = 'user/GET_USER';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
const GET_USER_ERROR = 'user/GET_USER_ERROR';

const ADD_USER = 'user/ADD_USER';
const ADD_USER_SUCCESS = 'user/ADD_USER_SUCCESS';
const ADD_USER_ERROR = 'user/ADD_USER_ERROR';

const DELETE_USER = 'user/DELETE_USER';
const DELETE_USER_SUCCESS = 'user/DELETE_USER_SUCCESS';
const DELETE_USER_ERROR = 'user/DELETE_USER_ERROR';

// thunk 함수
export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS });
  try {
    const users = await userAPI.getUsers();
    dispatch({ type: GET_USERS_SUCCESS, payload: users });
  } catch (e) {
    dispatch({ type: GET_USERS_ERROR, payload: e });
  }
};

// 초기값
const initialState = {
  loading: false,
  users: [],
  user: null,
  error: null,
};

// 리듀서
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        loading: true,
        users: [],
        error: null,
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null,
      };
    }
    case GET_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    }
    case GET_USER: {
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    }
    case ADD_USER: {
      return {
        ...state,
        loading: true,
        users: [],
        error: null,
      };
    }
    case ADD_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: null,
      };
    }
    case ADD_USER_ERROR: {
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        loading: true,
        users: [],
        error: null,
      };
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: users.filter((user) => user._id !== action.payload),
        error: null,
      };
    }
    case DELETE_USER_ERROR: {
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
