import {
  LOGIN_MODAL_TOGGLE,
  REGISTER_MODAL_TOGGLE,
  SALT_MODAL_TOGGLE,
  QUESTION_MODAL_TOGGLE,
  SET_MODAL_DATA,
} from "./actions";

export const loginModalToggle = () => {
  return {
    type: LOGIN_MODAL_TOGGLE,
  };
};

export const registerModalToggle = () => {
  return {
    type: REGISTER_MODAL_TOGGLE,
  };
};

export const saltModalToggle = (data = null) => {
  return {
    type: SALT_MODAL_TOGGLE,
    payload: { data },
  };
};

export const questionModalToggle = () => {
  return {
    type: QUESTION_MODAL_TOGGLE,
  };
};

export const setModalData = (data) => {
  return {
    type: SET_MODAL_DATA,
    payload: { data },
  };
};
