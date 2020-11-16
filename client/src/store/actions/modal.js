import { LOGIN_MODAL_TOGGLE, REGISTER_MODAL_TOGGLE } from "./actions";

export const loginModalToggle = () => {
    return {
        type: LOGIN_MODAL_TOGGLE
    };
};

export const registerModalToggle = () => {
    return {
        type: REGISTER_MODAL_TOGGLE
    };
};
