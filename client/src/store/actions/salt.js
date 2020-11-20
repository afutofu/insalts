import axios from "axios";

import {
  GET_SALTS_BEGIN,
  GET_SALTS_SUCCESS,
  GET_SALTS_FAIL,
  GET_SALT_BEGIN,
  GET_SALT_SUCCESS,
  GET_SALT_FAIL,
  CREATE_SALT_BEGIN,
  CREATE_SALT_SUCCESS,
  CREATE_SALT_FAIL,
  EDIT_SALT_BEGIN,
  EDIT_SALT_SUCCESS,
  EDIT_SALT_FAIL,
  JOIN_SALT_BEGIN,
  JOIN_SALT_SUCCESS,
  JOIN_SALT_FAIL,
  LEAVE_SALT_BEGIN,
  LEAVE_SALT_SUCCESS,
  LEAVE_SALT_FAIL,
} from "./actions";

import { addJoinedSalt, editJoinedSalt, removeJoinedSalt } from "./auth";

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

export const getSalt = (saltName) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(getSaltBegin());
    axios
      .get(`/api/salts/${saltName}`)
      .then((res) => {
        dispatch(getSaltSuccess(res.data));
        resolve(res.data);
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(getSaltFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const getSaltBegin = () => {
  return {
    type: GET_SALT_BEGIN,
  };
};

const getSaltSuccess = (salt) => {
  return {
    type: GET_SALT_SUCCESS,
    payload: { salt },
  };
};

const getSaltFail = (msg) => {
  return {
    type: GET_SALT_FAIL,
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
        dispatch(addJoinedSalt(res.data));
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

export const editSalt = (name, title, description) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(editSaltBegin());
    axios
      .patch(
        `/api/salts/${name}/edit`,
        { title, description },
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch(editSaltSuccess(res.data));
        dispatch(editJoinedSalt(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(editSaltFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const editSaltBegin = () => {
  return {
    type: EDIT_SALT_BEGIN,
  };
};

const editSaltSuccess = (updatedSalt) => {
  return {
    type: EDIT_SALT_SUCCESS,
    payload: { updatedSalt },
  };
};

const editSaltFail = (msg) => {
  return {
    type: EDIT_SALT_FAIL,
    payload: { msg },
  };
};

export const joinSalt = (saltName) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(joinSaltBegin());
    axios
      .patch(`/api/salts/${saltName}/join`, {}, tokenConfig(getState))
      .then((res) => {
        dispatch(joinSaltSuccess(res.data));
        dispatch(addJoinedSalt(res.data));
        resolve();
      })
      .catch((err) => {
        if (err && err.response) {
          dispatch(joinSaltFail(err.response.data.msg));
          reject(err.response.data.msg);
        } else {
          console.log(err);
          reject(err);
        }
      });
  });
};

const joinSaltBegin = () => {
  return {
    type: JOIN_SALT_BEGIN,
  };
};

const joinSaltSuccess = (updatedSalt) => {
  return {
    type: JOIN_SALT_SUCCESS,
    payload: { updatedSalt },
  };
};

const joinSaltFail = (msg) => {
  return {
    type: JOIN_SALT_FAIL,
    payload: { msg },
  };
};

export const leaveSalt = (saltName) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch(leaveSaltBegin());
    axios
      .patch(`/api/salts/${saltName}/leave`, {}, tokenConfig(getState))
      .then((res) => {
        if (res.data) {
          dispatch(leaveSaltSuccess(res.data, false));
          dispatch(removeJoinedSalt(saltName));
        } else {
          dispatch(leaveSaltSuccess(saltName, true));
          dispatch(removeJoinedSalt(saltName));
        }

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

const leaveSaltSuccess = (saltInfo, deleted) => {
  if (deleted) {
    return {
      type: LEAVE_SALT_SUCCESS,
      payload: { saltName: saltInfo, deleted },
    };
  }
  return {
    type: LEAVE_SALT_SUCCESS,
    payload: { updatedSalt: saltInfo, deleted },
  };
};

const leaveSaltFail = (msg) => {
  return {
    type: LEAVE_SALT_FAIL,
    payload: { msg },
  };
};
