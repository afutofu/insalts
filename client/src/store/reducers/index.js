import { combineReducers } from "redux";

import authReducer from "./auth";
import saltReducer from "./salt";
import modalReducer from "./modal";

const allReducers = combineReducers({
  auth: authReducer,
  salt: saltReducer,
  modal: modalReducer,
});

export default allReducers;
