import axios from "axios";
import { REGISTER_BEGIN, REGISTER_SUCCESS, REGISTER_FAIL } from "./actions";

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
          reject(err.response.data.errors);
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
