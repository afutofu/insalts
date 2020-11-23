import SaltItem from "../../components/SaltItem";
import {
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_BEGIN,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
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
      return {
        ...state,
        selectedPost: null,
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
    case GET_POSTS_FAIL:
    case GET_POST_FAIL:
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
