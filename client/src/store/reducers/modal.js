import {
  LOGIN_MODAL_TOGGLE,
  REGISTER_MODAL_TOGGLE,
  SALT_MODAL_TOGGLE,
  QUESTION_MODAL_TOGGLE,
  SET_MODAL_DATA,
} from "../actions/actions";

const initialState = {
  login: false,
  register: false,
  salt: false,
  question: false,
  data: {},
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_MODAL_TOGGLE:
      return {
        ...state,
        login: !state.login,
      };
    case REGISTER_MODAL_TOGGLE:
      return {
        ...state,
        register: !state.register,
      };
    case SALT_MODAL_TOGGLE:
      return {
        ...state,
        salt: !state.salt,
      };
    case QUESTION_MODAL_TOGGLE:
      return {
        ...state,
        question: !state.question,
      };
    case SET_MODAL_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default modalReducer;
