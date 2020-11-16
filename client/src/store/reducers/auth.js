import {
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/actions";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_BEGIN:
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
