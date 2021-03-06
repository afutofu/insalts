import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_JOINED_SALT,
  REMOVE_JOINED_SALT,
  EDIT_JOINED_SALT,
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
    case FETCH_USER_BEGIN:
    case REGISTER_BEGIN:
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ADD_JOINED_SALT:
      return {
        ...state,
        user: {
          ...state.user,
          joinedSalts: [action.payload.newSalt, ...state.user.joinedSalts],
        },
      };
    case EDIT_JOINED_SALT:
      return {
        ...state,
        user: {
          ...state.user,
          joinedSalts: state.user.joinedSalts.map((salt) => {
            if (salt.name === action.payload.updatedSalt.name) {
              return action.payload.updatedSalt;
            }
            return salt;
          }),
        },
      };
    case REMOVE_JOINED_SALT:
      return {
        ...state,
        user: {
          ...state.user,
          joinedSalts: state.user.joinedSalts.filter(
            (salt) => salt.name !== action.payload.saltName
          ),
        },
      };
    case FETCH_USER_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
