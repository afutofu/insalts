import {
    REGISTER_BEGIN,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/actions";

const initialState = {
    loading: false,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_BEGIN:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default authReducer;
