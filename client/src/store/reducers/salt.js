import {
  GET_SALTS_BEGIN,
  GET_SALTS_SUCCESS,
  GET_SALTS_FAIL,
  CREATE_SALT_BEGIN,
  CREATE_SALT_SUCCESS,
  CREATE_SALT_FAIL,
} from "../actions/actions";

const initialState = {
  salts: [],
  error: null,
  isLoading: false,
};

const saltReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALTS_BEGIN:
    case CREATE_SALT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SALTS_SUCCESS:
      return {
        ...state,
        salts: [...action.payload.salts],
        isLoading: false,
      };
    case CREATE_SALT_SUCCESS:
      return {
        ...state,
        salts: [action.payload.newSalt, ...state.salts],
        isLoading: false,
      };
    case GET_SALTS_FAIL:
    case CREATE_SALT_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default saltReducer;
