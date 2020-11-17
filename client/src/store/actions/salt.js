import axios from "axios";

import {
  CREATE_SALT_BEGIN,
  CREATE_SALT_SUCCESS,
  CREATE_SALT_FAIL,
} from "./actions";

import { tokenConfig } from "../../shared/utils";

export const createSalt = (name, title, description) => (
  dispatch,
  getState
) => {
  return new Promise((resolve, reject) => {
    dispatch(createSaltBegin());
    axios
      .post("/api/salts", { name, title, description }, tokenConfig(getState))
      .then((res) => {
        console.log(res.data);
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
