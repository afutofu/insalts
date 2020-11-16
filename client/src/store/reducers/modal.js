import { LOGIN_MODAL_TOGGLE, REGISTER_MODAL_TOGGLE } from "../actions/actions";

const initialState = {
    login: false,
    register: false
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_MODAL_TOGGLE:
            return {
                ...state,
                login: !state.login
            };
        case REGISTER_MODAL_TOGGLE:
            return {
                ...state,
                register: !state.register
            };
        default:
            return state;
    }
};

export default modalReducer;
