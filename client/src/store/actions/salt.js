import axios from "axios";

import {
  GET_SALTS_BEGIN,
  GET_SALTS_SUCCESS,
  GET_SALTS_FAIL,
  CREATE_SALT_BEGIN,
  CREATE_SALT_SUCCESS,
  CREATE_SALT_FAIL,
  LEAVE_SALT_BEGIN,
  LEAVE_SALT_SUCCESS,
  LEAVE_SALT_FAIL,
} from "./actions";

import { tokenConfig } from "../../shared/utils";

export const getSalts = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(getSaltsBegin());
    axios
      .get("/api/salts")
      .then((res) => {
        dispatch(getSaltsSuccess(res.data));
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

const getSaltsSuccess = (salts) => {
  return {
    type: GET_SALTS_SUCCESS,
    payload: { salts },
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
        dispatch(createSaltSuccess(res.data));
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

const createSaltSuccess = (newSalt) => {
  return {
    type: CREATE_SALT_SUCCESS,
    payload: { newSalt },
  };
};

const createSaltFail = (msg) => {
  return {
    type: CREATE_SALT_FAIL,
    payload: { msg },
  };
};

export const leaveSalt = (saltName) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(leaveSaltBegin());
    axios
      .patch(`/api/salts/${saltName}/leave`, {}, tokenConfig(getState))
      .then((res) => {
        dispatch(leaveSaltSuccess(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(leaveSaltFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const leaveSaltBegin = () => {
  return {
    type: LEAVE_SALT_BEGIN,
  };
};

const leaveSaltSuccess = (saltName) => {
  return {
    type: LEAVE_SALT_SUCCESS,
    payload: { saltName },
  };
};

const leaveSaltFail = (msg) => {
  return {
    type: LEAVE_SALT_FAIL,
    payload: { msg },
  };
};
