import axios from "axios";

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

export const getPost = (postId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(getPostBegin());
    axios
      .get(`/api/posts/${postId}`)
      .then((res) => {
        dispatch(getPostSuccess(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(getPostFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const getPostBegin = () => {
  return {
    type: GET_POST_BEGIN,
  };
};

const getPostSuccess = (post) => {
  return {
    type: GET_POST_SUCCESS,
    payload: { post },
  };
};

const getPostFail = (msg) => {
  return {
    type: GET_POST_FAIL,
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

export const editPost = (postId, title, content) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(editPostBegin());
    axios
      .patch(
        `/api/posts/${postId}/edit`,
        { title, content },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(editPostSuccess(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(editPostFail(err.response.data.msg));
          reject(err.response.data);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const editPostBegin = () => {
  return {
    type: EDIT_POST_BEGIN,
  };
};

const editPostSuccess = (updatedPost) => {
  return {
    type: EDIT_POST_SUCCESS,
    payload: { updatedPost },
  };
};

const editPostFail = (msg) => {
  return {
    type: EDIT_POST_FAIL,
    payload: { msg },
  };
};

export const deletePost = (postId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(deletePostBegin());
    axios
      .delete(`/api/posts/${postId}/delete`, tokenConfig(getState))
      .then(() => {
        dispatch(deletePostSuccess(postId));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(deletePostFail(err.response.data.msg));
          reject(err.response.data);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const deletePostBegin = () => {
  return {
    type: DELETE_POST_BEGIN,
  };
};

const deletePostSuccess = (postId) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: { postId },
  };
};

const deletePostFail = (msg) => {
  return {
    type: DELETE_POST_FAIL,
    payload: { msg },
  };
};
