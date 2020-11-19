import {
  GET_SALTS_BEGIN,
  GET_SALTS_SUCCESS,
  GET_SALTS_FAIL,
  CREATE_SALT_BEGIN,
  CREATE_SALT_SUCCESS,
  CREATE_SALT_FAIL,
  JOIN_SALT_BEGIN,
  JOIN_SALT_SUCCESS,
  JOIN_SALT_FAIL,
  LEAVE_SALT_BEGIN,
  LEAVE_SALT_SUCCESS,
  LEAVE_SALT_FAIL,
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
    case JOIN_SALT_BEGIN:
    case LEAVE_SALT_BEGIN:
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
    case JOIN_SALT_SUCCESS:
      return {
        ...state,
        salts: state.salts.map((salt) => {
          if (salt.name === action.payload.newSalt.name) {
            return action.payload.newSalt;
          }
          return salt;
        }),
        isLoading: false,
      };
    case LEAVE_SALT_SUCCESS:
      if (action.payload.deleted) {
        return {
          ...state,
          salts: state.salts.filter(
            (salt) => salt.name !== action.payload.saltName
          ),
        };
      }
      return {
        ...state,
        salts: state.salts.map((salt) => {
          if (salt.name === action.payload.newSalt.name) {
            return action.payload.newSalt;
          }
          return salt;
        }),
        isLoading: false,
      };
    case GET_SALTS_FAIL:
    case CREATE_SALT_FAIL:
    case JOIN_SALT_FAIL:
    case LEAVE_SALT_FAIL:
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
