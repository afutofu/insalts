import axios from "axios";
import {
  REGISTER_BEGIN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./actions";

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
    payload: {
      token,
      user,
    },
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
          dispatch(registerFail());
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
