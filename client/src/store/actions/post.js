import axios from "axios";

import {
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  CREATE_POST_BEGIN,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
} from "./actions";

import { tokenConfig } from "../../shared/utils";

export const getPosts = (saltName = null) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(getPostsBegin());
    axios
      .get("/api/posts", {
        params: {
          saltName,
        },
      })
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

export const createPost = (title, content, saltName) => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    dispatch(createPostBegin());
    axios
      .post("/api/posts", { title, content, saltName }, tokenConfig(getState))
      .then((res) => {
        dispatch(createPostSuccess(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(createPostFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const createPostBegin = () => {
  return {
    type: CREATE_POST_BEGIN,
  };
};

const createPostSuccess = (newPost) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: { newPost },
  };
};

const createPostFail = (msg) => {
  return {
    type: CREATE_POST_FAIL,
    payload: { msg },
  };
};
