import axios from "axios";

import { GET_POSTS_BEGIN, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from "./actions";

export const getPosts = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(getPostsBegin());
    axios
      .get("/api/posts")
      .then((res) => {
        dispatch(getPostsSuccess(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(getPostsFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const getPostsBegin = () => {
  return {
    type: GET_POSTS_BEGIN,
  };
};

const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: { posts },
  };
};

const getPostsFail = (msg) => {
  return {
    type: GET_POSTS_FAIL,
    payload: { msg },
  };
};
