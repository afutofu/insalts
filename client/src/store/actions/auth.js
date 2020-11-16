import axios from "axios";
import { REGISTER_BEGIN, REGISTER_SUCCESS, REGISTER_FAIL } from "./actions";

export const register = (username, email, password) => dispatch => {
    return new Promise(function(resolve, reject) {
        dispatch(registerBegin());
        axios
            .post("/api/users", { username, email, password })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    });
};

const registerBegin = () => {
    return {
        type: REGISTER_BEGIN
    };
};

const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    };
};

const registerFail = () => {
    return {
        type: REGISTER_FAIL
    };
};
