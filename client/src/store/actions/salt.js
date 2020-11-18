import axios from "axios";

import {
  GET_SALTS_BEGIN,
  GET_SALTS_SUCCESS,
  GET_SALTS_FAIL,
  CREATE_SALT_BEGIN,
  CREATE_SALT_SUCCESS,
  CREATE_SALT_FAIL,
} from "./actions";

import { tokenConfig } from "../../shared/utils";

export const getSalts = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(getSaltsBegin());
    axios
      .get("/api/salts")
      .then((res) => {
        console.log(res.data);
        dispatch(getSaltsSuccess());
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(getSaltsFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const getSaltsBegin = () => {
  return {
    type: GET_SALTS_BEGIN,
  };
};

const getSaltsSuccess = () => {
  return {
    type: GET_SALTS_SUCCESS,
    payload: {},
  };
};

const getSaltsFail = (msg) => {
  return {
    type: GET_SALTS_FAIL,
    payload: { msg },
  };
};

export const createSalt = (name, title, description) => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    dispatch(createSaltBegin());
    axios
      .post("/api/salts", { name, title, description }, tokenConfig(getState))
      .then((res) => {
        dispatch(createSaltSuccess());
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(createSaltFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const createSaltBegin = () => {
  return {
    type: CREATE_SALT_BEGIN,
  };
};

const createSaltSuccess = () => {
  return {
    type: CREATE_SALT_SUCCESS,
    payload: {},
  };
};

const createSaltFail = (msg) => {
  return {
    type: CREATE_SALT_FAIL,
    payload: { msg },
  };
};
