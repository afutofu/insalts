import {
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_BEGIN,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  EDIT_POST_BEGIN,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
  DELETE_POST_BEGIN,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
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
    case GET_POST_BEGIN:
    case CREATE_POST_BEGIN:
      return {
        ...state,
        selectedPost: null,
        isLoading: true,
        error: null,
      };

    case EDIT_POST_BEGIN:
    case DELETE_POST_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.posts],
        isLoading: false,
        error: null,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        selectedPost: { ...action.payload.post },
        isLoading: false,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload.newPost, ...state.posts],
        isLoading: false,
        error: null,
      };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        selectedPost: { ...action.payload.updatedPost },
        isLoading: false,
        error: null,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => post.id !== action.payload.postId),
        isLoading: false,
        error: null,
      };
    case GET_POSTS_FAIL:
    case GET_POST_FAIL:
    case CREATE_POST_FAIL:
    case EDIT_POST_FAIL:
    case DELETE_POST_FAIL:
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
