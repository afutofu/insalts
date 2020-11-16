import { combineReducers } from "redux";

import authReducer from "./auth";
import modalReducer from "./modal";

const allReducers = combineReducers({
    auth: authReducer,
    modal: modalReducer
});

export default allReducers;
