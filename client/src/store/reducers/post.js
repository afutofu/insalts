import {
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
} from "../actions/actions";

const initialState = {
  selectedPost: null,
  posts: [],
  error: null,
  isLoading: false,
};

const saltReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.posts],
        isLoading: false,
        error: null,
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        error: action.payload.msg,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default saltReducer;
