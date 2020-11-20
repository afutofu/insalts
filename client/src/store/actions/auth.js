import axios from "axios";
import {
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_JOINED_SALT,
  EDIT_JOINED_SALT,
  REMOVE_JOINED_SALT,
} from "./actions";

import { tokenConfig } from "../../shared/utils";

// Check token & fetch user
export const fetchUser = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(fetchUserBegin());
    axios
      .get("/api/auth/user", tokenConfig(getState))
      .then((res) => {
        const { token, user } = res.data;
        dispatch(fetchUserSuccess(token, user));
        resolve(res.data);
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(fetchUserFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const fetchUserBegin = () => {
  return {
    type: FETCH_USER_BEGIN,
  };
};

const fetchUserSuccess = (token, user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { token, user },
  };
};

const fetchUserFail = (msg) => {
  return {
    type: FETCH_USER_FAIL,
    payload: { id: "FETCH_USER_ERROR", msg: msg },
  };
};

export const register = (username, email, password, rePassword) => (
  dispatch
) => {
  return new Promise(function (resolve, reject) {
    dispatch(registerBegin());
    axios
      .post("/api/users", { username, email, password, rePassword })
      .then((res) => {
        const { token, user } = res.data;
        dispatch(registerSuccess(token, user));
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(registerFail());
          reject(err.response.data);
        } else {
          console.log(err);
        }
      });
  });
};

const registerBegin = () => {
  return {
    type: REGISTER_BEGIN,
  };
};

const registerSuccess = (token, user) => {
  return {
    type: REGISTER_SUCCESS,
    payload: { token, user },
  };
};

const registerFail = () => {
  return {
    type: REGISTER_FAIL,
  };
};

export const login = (email, password) => (dispatch) => {
  return new Promise(function (resolve, reject) {
    dispatch(loginBegin());
    axios
      .post("/api/auth", { email, password })
      .then((res) => {
        const { token, user } = res.data;
        dispatch(loginSuccess(token, user));
        resolve(res.data);
      })
      .catch((err) => {
        if (err.response) {
          dispatch(loginFail());
          reject(err.response.data);
        } else {
          console.log(err);
        }
      });
  });
};

const loginBegin = () => {
  return {
    type: LOGIN_BEGIN,
  };
};

const loginSuccess = (token, user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user,
    },
  };
};

const loginFail = () => {
  return {
    type: LOGIN_FAIL,
  };
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const addJoinedSalt = (newSalt) => {
  return {
    type: ADD_JOINED_SALT,
    payload: { newSalt },
  };
};

export const editJoinedSalt = (updatedSalt) => {
  return {
    type: EDIT_JOINED_SALT,
    payload: { updatedSalt },
  };
};

export const removeJoinedSalt = (saltName) => {
  return {
    type: REMOVE_JOINED_SALT,
    payload: { saltName },
  };
};
